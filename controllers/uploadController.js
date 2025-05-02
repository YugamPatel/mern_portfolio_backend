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
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "portfolio/profile" },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return response(res, 500, "Upload failed", false, err);
        }
        // **no DB touches here**
        return response(res, 200, "Upload successful", true, {
          public_id: result.public_id,
          url:       result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("uploadProfileImage error:", error);
    return response(res, 500, "Server error", false, error.message);
  }
};