import cloudinary from "cloudinary";
import { User } from "../models/User.js"; // Adjust the import path as necessary

// ────────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

const response = (res, statusCode, message, success = true, output) => {
  if (!success) {
    return res.status(statusCode).json({ success, message });
  }
  return res.status(statusCode).json({ success, message, output });
};

export const imageUpload = async (req, res) => {
  const {
    banner_img,
    profile_img,
    background_img,
    aboutImage,
    aboutImageBack,
    logo,
    mobileLogo,
  } = req.body;

  const user = await User.findById(process.env.id);
  console.log(user);

  if (!user) {
    response(res, 404, "User not found", false, null);
  }

  if (banner_img) {
    if (user.home.banner_img?.public_id) {
      await cloudinary.v2.uploader.destroy(user.home.banner_img.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(banner_img, {
      folder: "portfolio/home/banner",
    });
    user.home.banner_img.public_id = myCloud.public_id;
    user.home.banner_img.url = myCloud.secure_url;
  }

  if (profile_img) {
    if (user.home.profile_img?.public_id) {
      await cloudinary.v2.uploader.destroy(user.home.profile_img.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(profile_img, {
      folder: "portfolio/home/profile",
    });
    user.home.profile_img.public_id = myCloud.public_id;
    user.home.profile_img.url = myCloud.secure_url;
  }

  if (background_img) {
    if (user.home.background?.public_id) {
      await cloudinary.v2.uploader.destroy(user.home.background.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(background_img, {
      folder: "portfolio/background",
    });
    user.home.background.public_id = myCloud.public_id;
    user.home.background.url = myCloud.secure_url;
  }

  if (aboutImage) {
    if (user.about.aboutImage?.public_id) {
      await cloudinary.v2.uploader.destroy(user.about.aboutImage.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(aboutImage, {
      folder: "portfolio/about/aboutImage",
    });
    user.about.aboutImage.public_id = myCloud.public_id;
    user.about.aboutImage.url = myCloud.secure_url;
  }

  if (aboutImageBack) {
    if (user.about.aboutImageBack?.public_id) {
      await cloudinary.v2.uploader.destroy(user.about.aboutImageBack.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(aboutImageBack, {
      folder: "portfolio/about/aboutImage",
    });
    user.about.aboutImageBack.public_id = myCloud.public_id;
    user.about.aboutImageBack.url = myCloud.secure_url;
  }

  if (logo) {
    if (user.about.logo?.public_id) {
      await cloudinary.v2.uploader.destroy(user.about.logo.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(logo, {
      folder: "portfolio/about/logo",
    });
    user.about.logo.public_id = myCloud.public_id;
    user.about.logo.url = myCloud.secure_url;
  }

  if (mobileLogo) {
    if (user.about.mobileLogo?.public_id) {
      await cloudinary.v2.uploader.destroy(user.about.mobileLogo.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(mobileLogo, {
      folder: "portfolio/about/logo",
    });
    user.about.mobileLogo.public_id = myCloud.public_id;
    user.about.mobileLogo.url = myCloud.secure_url;
  }

  await user.save();
  response(res, 200, "User image uploaded successfully", true, user);
};

export const updateUser = async (req, res) => {
  try {
    const {
      userName,
      password,
      home,
      about,
      modernAbout,
      skills,
      educationTimeline,
      workTimeline,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(process.env.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ─── IMAGE UPLOADS ───────────────────────────────────────────────────────────

    if (home?.profile_img) {
      const myCloud = await cloudinary.v2.uploader.upload(home.profile_img, {
        folder: "portfolio/home/profile",
      });
      user.home.profile_img.public_id = myCloud.public_id;
      user.home.profile_img.url = myCloud.secure_url;
    }

    // ─── USER UPDATES ────────────────────────────────────────────────────────────

    await user.save(); // Save the updated user document

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteSkills = async (req, res) => {
  try {
    const user = await User.findById(process.env.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.skills = null;
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to delete skills:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addSkills = async (req, res) => {
  try {
    const user = await User.findById(process.env.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { skillsone, skillstwo, skillsthree } = req.body;
    user.skillsone.push(...skillsone);
    user.skillstwo.push(...skillstwo);
    user.skillsthree.push(...skillsthree);
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to delete skills:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



