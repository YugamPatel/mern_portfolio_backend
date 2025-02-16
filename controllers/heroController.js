import {
  response,
  uploadImageToCloudinary,
} from "../helperFunctions/helper.js";
import { User } from "../models/User.js";

// ────────────────────────────────────────────────────────────────────────────────
// 1️⃣ GET HERO SECTION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const getHero = async (req, res) => {
  try {
    const user = await User.findOne().select("hero");
    if (!user) {
      return response(res, 404, "User not found", false, null);
    }
    response(res, 200, "Hero section retrieved successfully", true, user.hero);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 2️⃣ UPDATE HERO SECTION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const updateHero = async (req, res) => {
  try {
    const updatedFields = {};

    // Add only the fields that exist in the request body
    Object.keys(req.body).forEach((key) => {
      updatedFields[`hero.${key}`] = req.body[key];
    });

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $set: updatedFields },
      { new: true, upsert: true }
    );

    response(
      res,
      200,
      "Hero section updated successfully",
      true,
      updatedUser.hero
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 3️⃣ RESET HERO SECTION TO DEFAULT
// ────────────────────────────────────────────────────────────────────────────────
export const resetHero = async (req, res) => {
  try {
    const defaultHero = {
      heroImage: {
        isRandom: false,
        randomImg:
          "https://source.unsplash.com/random/?&mountains&forest&gradient&galaxy&ocean&landscape",
        img: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      profileImage: {
        img: "https://res.cloudinary.com/dwig4hupj/image/upload/v1736968666/img2_wfcmtu.jpg",
        style: {
          transform: "scale(2.8)",
          objectPosition: "0px 10px",
        },
      },
      heroTitle: {
        intro: "Hi, I'm",
        name: "Yugam.",
      },
      heroSubTitle: {
        subTitle: "And I am a,",
      },
      socialLinks: [
        {
          name: "Facebook",
          url: "https://www.facebook.com/yugampatel/",
          iconClass: "fa-brands fa-facebook",
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/its.yugam/",
          iconClass: "fa-brands fa-instagram",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/yugampatel/",
          iconClass: "fa-brands fa-linkedin",
        },
        {
          name: "GitHub",
          url: "https://github.com/YugamPatel/",
          iconClass: "fa-brands fa-github",
        },
      ],
      typewriter: [
        "< MERN Stack Developer />",
        "=> ( Js Developer )",
        "AWS Certified Developer",
        "( Flutter Developer )",
        "{ Java Developer }",
        "{ Co-op Student }",
      ],
      button: {
        name: "Download Resume",
        url: "https://drive.google.com/file/d/1KKZr2A57vq246mbtlaWcooCoVDqyiRtK/view?usp=sharing",
      },
    };

    const updatedUser = await User.findOneAndUpdate(
      {},
      { hero: defaultHero },
      { new: true }
    );

    response(res, 200, "Hero section reset to default", true, updatedUser.hero);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 4️⃣ DELETE A SOCIAL LINK
// ────────────────────────────────────────────────────────────────────────────────
export const deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $pull: { "hero.socialLinks": { _id: id } } },
      { new: true }
    );

    response(
      res,
      200,
      "Social link deleted successfully",
      true,
      updatedUser.hero.socialLinks
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 5️⃣ ADD A NEW SOCIAL LINK
// ────────────────────────────────────────────────────────────────────────────────
export const addSocialLink = async (req, res) => {
  try {
    const { name, url, iconClass } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $push: { "hero.socialLinks": { name, url, iconClass } } },
      { new: true }
    );

    response(
      res,
      201,
      "Social link added successfully",
      true,
      updatedUser.hero.socialLinks
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 6️⃣ UPDATE ORDER OF TYPEWRITER EFFECTS
// ────────────────────────────────────────────────────────────────────────────────
export const updateTypewriter = async (req, res) => {
  try {
    const { typewriter } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {},
      { "hero.typewriter": typewriter },
      { new: true }
    );

    response(
      res,
      200,
      "Typewriter effect updated successfully",
      true,
      updatedUser.hero.typewriter
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// RESET SUBSECTIONS OF HERO SECTION
// ────────────────────────────────────────────────────────────────────────────────
export const resetHeroTitle = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      { "hero.heroTitle": { intro: "Hi, I'm", name: "Yugam." } },
      { new: true }
    );
    response(
      res,
      200,
      "Hero title reset to default",
      true,
      updatedUser.hero.heroTitle
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const resetHeroSubTitle = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      { "hero.heroSubTitle": { subTitle: "And I am a," } },
      { new: true }
    );
    response(
      res,
      200,
      "Hero subtitle reset to default",
      true,
      updatedUser.hero.heroSubTitle
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const resetSocialLinks = async (req, res) => {
  try {
    const defaultSocialLinks = [
      {
        name: "Facebook",
        url: "https://www.facebook.com/yugampatel/",
        iconClass: "fa-brands fa-facebook",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/its.yugam/",
        iconClass: "fa-brands fa-instagram",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yugampatel/",
        iconClass: "fa-brands fa-linkedin",
      },
      {
        name: "GitHub",
        url: "https://github.com/YugamPatel/",
        iconClass: "fa-brands fa-github",
      },
    ];

    const updatedUser = await User.findOneAndUpdate(
      {},
      { "hero.socialLinks": defaultSocialLinks },
      { new: true }
    );

    response(
      res,
      200,
      "Social links reset to default",
      true,
      updatedUser.hero.socialLinks
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const resetTypewriter = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      {
        "hero.typewriter": [
          "< MERN Stack Developer />",
          "=> ( Js Developer )",
          "AWS Certified Developer",
        ],
      },
      { new: true }
    );
    response(
      res,
      200,
      "Typewriter effect reset to default",
      true,
      updatedUser.hero.typewriter
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const resetButton = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      {
        "hero.button": {
          name: "Download Resume",
          url: "https://drive.google.com/file/d/1KKZr2A57vq246mbtlaWcooCoVDqyiRtK/view?usp=sharing",
        },
      },
      { new: true }
    );
    response(
      res,
      200,
      "Hero button reset to default",
      true,
      updatedUser.hero.button
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
