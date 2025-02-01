import {
  uploadImageToCloudinary,
  response,
} from "../helperFunctions/helper.js";
import { User } from "../models/User.js";

// ────────────────────────────────────────────────────────────────────────────────
// 1️⃣ GET ABOUT SECTION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const getAbout = async (req, res) => {
  try {
    const user = await User.findOne().select("about");
    if (!user) return response(res, 404, "User not found", false, null);

    response(
      res,
      200,
      "About section retrieved successfully",
      true,
      user.about
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 2️⃣ UPDATE ABOUT SECTION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const updateAbout = async (req, res) => {
  try {
    const updatedFields = {};

    Object.keys(req.body).forEach((key) => {
      updatedFields[`about.${key}`] = req.body[key];
    });

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $set: updatedFields },
      { new: true, upsert: true }
    );

    response(
      res,
      200,
      "About section updated successfully",
      true,
      updatedUser.about
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 3️⃣ RESET ENTIRE ABOUT SECTION TO DEFAULT
// ────────────────────────────────────────────────────────────────────────────────
export const resetAbout = async (req, res) => {
  try {
    const defaultAbout = {
      frontPhoto:
        "https://res.cloudinary.com/dwig4hupj/image/upload/v1707072392/portfolio/about/aboutImage/o6j5ehbsxha1bparz8cz.jpg",
      backPhoto:
        "https://res.cloudinary.com/dwig4hupj/image/upload/v1707097539/portfolio/about/vhtose4jdeupelcqnrd1.jpg",
      logo: "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/wrtlzo9obttluvozjmf0.png",
      mobileLogo:
        "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/uawcp9hroyofui2umbdb.png",
      textP1: "Hello, I'm Yugam, a MERN, Full Stack and Flutter Developer...",
      textP2: "As a Computer Science student at the University of Manitoba...",
    };

    const updatedUser = await User.findOneAndUpdate(
      {},
      { about: defaultAbout },
      { new: true }
    );

    response(
      res,
      200,
      "About section reset to default",
      true,
      updatedUser.about
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// RESET SUBSECTIONS OF ABOUT SECTION
// ────────────────────────────────────────────────────────────────────────────────
export const resetAboutText = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      {
        "about.textP1":
          "Hello, I'm Yugam, a MERN, Full Stack and Flutter Developer...",
        "about.textP2":
          "As a Computer Science student at the University of Manitoba...",
      },
      { new: true }
    );

    response(res, 200, "About text reset to default", true, {
      textP1: updatedUser.about.textP1,
      textP2: updatedUser.about.textP2,
    });
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const resetAboutImages = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      {
        "about.frontPhoto":
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707072392/portfolio/about/aboutImage/o6j5ehbsxha1bparz8cz.jpg",
        "about.backPhoto":
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707097539/portfolio/about/vhtose4jdeupelcqnrd1.jpg",
        "about.logo":
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/wrtlzo9obttluvozjmf0.png",
        "about.mobileLogo":
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/uawcp9hroyofui2umbdb.png",
      },
      { new: true }
    );

    response(res, 200, "About images reset to default", true, {
      frontPhoto: updatedUser.about.frontPhoto,
      backPhoto: updatedUser.about.backPhoto,
      logo: updatedUser.about.logo,
      mobileLogo: updatedUser.about.mobileLogo,
    });
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
