// backend/controllers/uploadController.js
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { response } from "../helperFunctions/helper.js";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });


cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
  secure:      true,
});


export const uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return response(res, 400, "No file provided", false);
  }

  try {
    const user = await User.findOne();
    if (!user) return response(res, 404, "User not found", false);

    // ensure nested objects exist
    if (!user.hero) user.hero = {};
    if (!user.hero.profileImage) user.hero.profileImage = { img: {}, style: {} };

    // delete old image if present
    const oldId = user.hero.profileImage.img.public_id;
    if (oldId) {
      await cloudinary.uploader.destroy(oldId);
    }

    // upload new image
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "portfolio/profile" },
      async (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return response(res, 500, "Upload failed", false, err);
        }

        // save the new public_id & url under user.hero.profileImage.img
        user.hero.profileImage.img = {
          public_id: result.public_id,
          url:       result.secure_url,
        };

        await user.save();

        return response(
          res,
          200,
          "Profile image updated",
          true,
          user.hero.profileImage.img
        );
      }
    );

    // pipe the buffer into Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("uploadProfileImage error:", error);
    return response(res, 500, "Server error", false, error.message);
  }
};