import {
  response,
  uploadImageToCloudinary,
} from "../helperFunctions/helper.js";
import { User } from "../models/User.js";

export const updateHomeInfo = async (req, res) => {
  try {
    const user = await User.findById(process.env.USER_ID);

    if (!user) {
      response(res, 404, "User not found", false, null);
      return;
    }

    const {
      heroImage,
      profileImage,
      heroTitle,
      heroSubtitle,
      socialLinks,
      typewriter,
      button,
    } = req.body;

    if (heroImage) {
      if (heroImage.img) {
        const heroImageUploadResult = await uploadImageToCloudinary(
          user.heroImage.img,
          heroImage.img,
          "portfolio/home/hero"
        );
        user.home.heroImage.img.public_id = heroImageUploadResult.public_id;
        user.home.heroImage.img.url = heroImageUploadResult.url;
      }

      if (heroImage.randomImage) {
        user.home.heroImage.randomImage = heroImage.randomImage;
      }
      if (heroImage.isRandom) {
        user.home.heroImage.isRandom = heroImage.isRandom;
      }
    }

    if (profileImage && profileImage.img) {
      const profileImageUploadResult = await uploadImageToCloudinary(
        user.profileImage.img,
        profileImage.img,
        "portfolio/home/profile"
      );
      user.home.profileImage.img.public_id = profileImageUploadResult.public_id;
      user.home.profileImage.img.url = profileImageUploadResult.url;
    }

    if (heroTitle) {
      user.home.heroTitle = {
        ...user.home.heroTitle,
        ...heroTitle,
      };
    }

    if (heroSubtitle) {
      user.home.heroSubtitle = {
        ...user.home.heroSubtitle,
        ...heroSubtitle,
      };
    }

    if (socialLinks && Array.isArray(socialLinks)) {
      user.home.socialLinks = socialLinks;
    }

    if (typewriter && Array.isArray(typewriter)) {
      user.home.typewriter = typewriter;
    }

    if (button) {
      user.home.button = {
        ...user.home.button,
        ...button,
      };
    }

    await user.save();

    response(
      res,
      200,
      "Home information updated successfully",
      true,
      user.home
    );
  } catch (error) {
    console.error("Failed to update home details:", error);
    response(res, 500, "Server error", false, error.message);
  }
};
