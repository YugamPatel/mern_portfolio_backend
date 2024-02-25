// ────────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ────────────────────────────────────────────────────────────────────────────────

import cloudinary from "cloudinary";
import { User } from "../models/User.js"; // Adjust the import path as necessary
import e from "express";

// ────────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

const uploadImageToCloudinary = async (userField, imagePath, folderPath) => {
  if (userField?.public_id) {
    await cloudinary.v2.uploader.destroy(userField.public_id);
  }
  const myCloud = await cloudinary.v2.uploader.upload(imagePath, {
    folder: folderPath,
  });
  return {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
};

const response = (res, statusCode, message, success = true, output) => {
  if (!success) {
    return res.status(statusCode).json({ success, message });
  }
  return res.status(statusCode).json({ success, message, output });
};

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLERS
// ────────────────────────────────────────────────────────────────────────────────

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(process.env.id).select(
      "-userName -password"
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

export const updateHomeInfo = async (req, res) => {
  try {
    // Updating the first (and only) user's home information
    const user = await User.findById(process.env.id);

    if (!user) {
      response(res, 404, "User not found", false, null);
    }

    const {
      banner_img,
      profile_img,
      background_img,
      mainString,
      intro,
      typewriter,
    } = req.body;

    if (mainString) user.home.mainString = mainString;
    if (intro) user.home.intro = intro;

    if (typewriter) {
      if (typeof typewriter === "string") {
        user.home.typewriter.push(typewriter);
      } else if (Array.isArray(typewriter) && typewriter.length > 0) {
        user.home.typewriter.push(...typewriter);
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid typewriter data provided.",
        });
      }
    }

    if (banner_img) {
      const updatedBannerImg = await uploadImageToCloudinary(
        user.home.banner_img,
        banner_img,
        "portfolio/home/banner"
      );
      user.home.banner_img = updatedBannerImg;
    }

    if (background_img) {
      const updatedBackgroundImg = await uploadImageToCloudinary(
        user.home.background,
        background_img,
        "portfolio/background"
      );
      user.home.background = updatedBackgroundImg;
    }

    if (profile_img) {
      const updatedProfileImg = await uploadImageToCloudinary(
        user.home.profile_img,
        profile_img,
        "portfolio/home/profile"
      );
      user.home.profile_img = updatedProfileImg;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided.",
      });
    }

    await user.save();

    response(res, 200, "Home information updated successfully", true, user);
  } catch (error) {
    console.error("Failed to update home details:", error);
    response(res, 500, "Server error", false, error.message);
  }
};

export const updateAboutInfo = async (req, res) => {
  try {
    const user = await User.findById(process.env.id);

    if (!user) {
      response(res, 404, "User not found", false, null);
    }

    const { aboutImage, aboutImageBack, logo, mobileLogo, textP1, textP2 } =
      req.body;

    // Handle image updates with the helper function
    if (aboutImage) {
      const updatedAboutImage = await uploadImageToCloudinary(
        user.about.aboutImage,
        aboutImage,
        "portfolio/about"
      );
      user.about.aboutImage = updatedAboutImage;
    }

    if (aboutImageBack) {
      const updatedAboutImageBack = await uploadImageToCloudinary(
        user.about.aboutImageBack,
        aboutImageBack,
        "portfolio/about"
      );
      user.about.aboutImageBack = updatedAboutImageBack;
    }

    if (logo) {
      const updatedLogo = await uploadImageToCloudinary(
        user.about.logo,
        logo,
        "portfolio/about"
      );
      user.about.logo = updatedLogo;
    }

    if (mobileLogo) {
      const updatedMobileLogo = await uploadImageToCloudinary(
        user.about.mobileLogo,
        mobileLogo,
        "portfolio/about"
      );
      user.about.mobileLogo = updatedMobileLogo;
    }

    // Update text fields
    if (textP1) user.about.textP1 = textP1;
    if (textP2) user.about.textP2 = textP2;

    await user.save();
    response(res, 200, "About information updated successfully", true, user);
  } catch (error) {
    console.error("Failed to update about details:", error);
    response(res, 500, "Server error", false, error.message);
  }
};

// TESTING NEEDED
export const updateModernAboutInfo = async (req, res) => {
  try {
    const user = await User.findById(process.env.id);

    if (!user) {
      response(res, 404, "User not found", false, null);
    } else {
      const {
        pageName,
        caption,
        name,
        age,
        aboutText,
        profession,
        topSkills,
        moreSkills,
      } = req.body;

      if (pageName) user.modernAbout.page.pageName = pageName;
      if (caption) user.modernAbout.page.caption = caption;
      if (name) user.modernAbout.card.name = name;
      if (age) user.modernAbout.card.age = age;
      if (aboutText) user.modernAbout.card.aboutText = aboutText;
      if (profession) user.modernAbout.card.profession = profession;

      if (topSkills) {
        if (typeof topSkills === "string") {
          user.modernAbout.card.topSkills.push(topSkills);
        } else if (Array.isArray(topSkills) && topSkills.length > 0) {
          user.modernAbout.card.topSkills.push(...topSkills);
        } else {
          response(res, 400, "Invalid typewriter data provided.", false, null);
        }
      }

      if (moreSkills) {
        // Initialize the skills array based on the type of moreSkills.skills
        const skills = Array.isArray(moreSkills.skills)
          ? moreSkills.skills
          : moreSkills.skills
          ? [moreSkills.skills]
          : [];

        // Check if both header and skills are provided and valid
        if (moreSkills.header && skills.length > 0) {
          const pushDetails = {
            header: moreSkills.header,
            skills,
          };

          user.modernAbout.card.moreSkills.push(pushDetails);
        } else {
          response(res, 400, "Invalid more skills data provided.", false, null);
        }
      }
    }

    if (req.params.id) {
      user.modernAbout.card.moreSkills.forEach((item) => {
        if (item.id === req.params.id) {
          if (req.body.header && req.body.skills) {
            item.skills = req.body.skills;
            item.header = req.body.header;
          }
        }
      });
    }

    await user.save();
    response(
      res,
      200,
      "Modern About information updated successfully",
      true,
      user
    ); // user is the updated user object
  } catch (error) {
    console.error("Failed to update modern about details:", error);
    response(res, 500, "Server error", false, error.message);
  }
};

export const addEducationTimeline = async (req, res) => {
  try {
    const { title, description, startdate, enddate } = req.body;

    // finds first user with specified id
    const user = await User.findById(process.env.id);

    // educationTimeline
    user.educationTimeline.push({
      title,
      description,
      startDate: startdate,
      endDate: enddate,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Education Timeline Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const addWorkTimeline = async (req, res) => {
  try {
    const { title, description, startdate, enddate } = req.body;

    const user = await User.findById(process.env.id);

    user.workTimeline.push({
      title,
      description,
      startDate: startdate,
      endDate: enddate,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Work Timeline Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const editEducationTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startdate, enddate } = req.body;

    const user = await User.findById(process.env.id);

    const itemToEdit = user.educationTimeline.filter((item) => item._id == id);

    if (title) {
      itemToEdit[0].title = title;
    }
    if (description) {
      itemToEdit[0].description = description;
    }
    if (startdate) {
      itemToEdit[0].startDate = startdate;
    }
    itemToEdit[0].endDate = enddate;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Education Timeline Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const editWorkTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startdate, enddate } = req.body;

    const user = await User.findById(process.env.id);

    const itemToEdit = user.workTimeline.filter((item) => item._id == id);

    if (title) {
      itemToEdit[0].title = title;
    }
    if (description) {
      itemToEdit[0].description = description;
    }
    if (startdate) {
      itemToEdit[0].startDate = startdate;
    }
    itemToEdit[0].endDate = enddate;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Work Timeline Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to delete a work timeline entry
export const deleteWorkTimelineEntry = async (req, res) => {
  const workTimelineId = req.params.workTimelineId; // The ID of the work timeline entry to delete

  try {
    const user = await User.findById(process.env.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the work timeline entry to be deleted
    const index = user.workTimeline.findIndex(
      (entry) => entry._id.toString() === workTimelineId
    );

    // If the work timeline entry was not found, return an error
    if (index === -1) {
      return res.status(404).json({ message: "Work timeline entry not found" });
    }

    // Remove the work timeline entry
    user.workTimeline.splice(index, 1);

    // Save the user document
    await user.save();

    res
      .status(200)
      .json({ message: "Work timeline entry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete work timeline entry:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteEducationTimelineEntry = async (req, res) => {
  const educationTimelineId = req.params.educationTimelineId; // The ID of the education timeline entry to delete

  try {
    const user = await User.findById(process.env.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the index of the education timeline entry to be deleted
    const index = user.educationTimeline.findIndex(
      (entry) => entry._id.toString() === educationTimelineId
    );

    // If the entry is not found, return an error
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Education timeline entry not found." });
    }

    // Remove the entry from the array
    user.educationTimeline.splice(index, 1);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "Education timeline entry deleted successfully." });
  } catch (error) {
    console.error("Failed to delete education timeline entry:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Skills Controllers
 *
 *
 *
 *
 * This file contains the CRUD (Create, Read, Update, Delete) operation controllers
 * for managing user skills divided into three categories: skillsone, skillstwo, and skillsthree.
 * Each controller is designed to handle specific operations such as adding new skills,
 * retrieving all skills, updating existing skills, and deleting skills from the user's profile.
 *
 * Operations include:
 * - Adding skills to skillsone, skillstwo, or skillsthree arrays
 * - Retrieving the list of skills from any of the three categories
 * - Updating skill entries within the specified category
 * - Deleting specific skills by value from a chosen category
 *
 *
 *
 *
 */

export const addSkills = async (req, res) => {
  const { skillsone, skillstwo, skillsthree } = req.body;

  try {
    const userProfile = await User.findById(process.env.id);

    if (!userProfile)
      return res.status(404).json({ message: "User profile not found." });

    if (skillsone && Array.isArray(skillsone)) {
      userProfile.skillsone.push(...skillsone);
    } else {
      userProfile.skillsone.push(skillsone);
    }

    if (skillstwo && Array.isArray(skillstwo)) {
      userProfile.skillstwo.push(...skillstwo);
    } else {
      userProfile.skillstwo.push(skillstwo);
    }

    if (skillsthree && Array.isArray(skillsthree)) {
      userProfile.skillsthree.push(...skillsthree);
    } else {
      userProfile.skillsthree.push(skillsthree);
    }

    // Save the updated user profile
    await userProfile.save();

    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const userProfile = await User.findById(process.env.id).select(
      "skillsone skillstwo skillsthree"
    );

    if (!userProfile)
      return res.status(404).json({ message: "User profile not found." });

    res.status(200).json({
      skillsone: userProfile.skillsone,
      skillstwo: userProfile.skillstwo,
      skillsthree: userProfile.skillsthree,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateSkills = async (req, res) => {
  const { skillsone, skillstwo, skillsthree } = req.body;

  try {
    const userProfile = await User.findById(process.env.id);

    if (!userProfile)
      return res.status(404).json({ message: "User profile not found." });

    if (skillsone) userProfile.skillsone = skillsone;
    if (skillstwo) userProfile.skillstwo = skillstwo;
    if (skillsthree) userProfile.skillsthree = skillsthree;

    await userProfile.save();

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/*
 * Remove Skills
 * Test Data :
 *
 *
 *
 {
  "arrayName": "skillsone",
  "skill": "JavaScript"
} 
*
*
*
*/


exports.removeSkill = async (req, res) => {
  const { skill, arrayName } = req.body; // arrayName should be 'skillsone', 'skillstwo', or 'skillsthree'

  try {
    const userProfile = await User.findById(process.env.id);

    if (!userProfile)
      return res.status(404).json({ message: "User profile not found." });

    if (["skillsone", "skillstwo", "skillsthree"].includes(arrayName)) {
      userProfile[arrayName] = userProfile[arrayName].filter(
        (item) => item !== skill
      );
      await userProfile.save();
      res
        .status(200)
        .json({ message: "Skill removed successfully.", userProfile });
    } else {
      res.status(400).json({ message: "Invalid array name." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
