// ────────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ────────────────────────────────────────────────────────────────────────────────

import { User } from "../models/User.js"; // Adjust the import path as necessary
import { response } from "../helperFunctions/helper.js";

import { uploadImageToCloudinary } from "../helperFunctions/helper.js";

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLERS
// ────────────────────────────────────────────────────────────────────────────────

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(process.env.id);
    response(res, 200, "Success getting user", true, user);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};



// /**
//  * Skills Controllers
//  *
//  *
//  *
//  *
//  * This file contains the CRUD (Create, Read, Update, Delete) operation controllers
//  * for managing user skills divided into three categories: skillsone, skillstwo, and skillsthree.
//  * Each controller is designed to handle specific operations such as adding new skills,
//  * retrieving all skills, updating existing skills, and deleting skills from the user's profile.
//  *
//  * Operations include:
//  * - Adding skills to skillsone, skillstwo, or skillsthree arrays
//  * - Retrieving the list of skills from any of the three categories
//  * - Updating skill entries within the specified category
//  * - Deleting specific skills by value from a chosen category
//  *
//  *
//  *
//  *
//  */

// export const addSkills = async (req, res) => {
//   const { skillsone, skillstwo, skillsthree } = req.body;

//   try {
//     const userProfile = await User.findById(process.env.id);

//     if (!userProfile)
//       return res.status(404).json({ message: "User profile not found." });

//     if (skillsone && Array.isArray(skillsone)) {
//       userProfile.skillsone.push(...skillsone);
//     } else {
//       userProfile.skillsone.push(skillsone);
//     }

//     if (skillstwo && Array.isArray(skillstwo)) {
//       userProfile.skillstwo.push(...skillstwo);
//     } else {
//       userProfile.skillstwo.push(skillstwo);
//     }

//     if (skillsthree && Array.isArray(skillsthree)) {
//       userProfile.skillsthree.push(...skillsthree);
//     } else {
//       userProfile.skillsthree.push(skillsthree);
//     }

//     // Save the updated user profile
//     await userProfile.save();

//     res.status(201).json(userProfile);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// exports.getSkills = async (req, res) => {
//   try {
//     const userProfile = await User.findById(process.env.id).select(
//       "skillsone skillstwo skillsthree"
//     );

//     if (!userProfile)
//       return res.status(404).json({ message: "User profile not found." });

//     res.status(200).json({
//       skillsone: userProfile.skillsone,
//       skillstwo: userProfile.skillstwo,
//       skillsthree: userProfile.skillsthree,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// exports.updateSkills = async (req, res) => {
//   const { skillsone, skillstwo, skillsthree } = req.body;

//   try {
//     const userProfile = await User.findById(process.env.id);

//     if (!userProfile)
//       return res.status(404).json({ message: "User profile not found." });

//     if (skillsone) userProfile.skillsone = skillsone;
//     if (skillstwo) userProfile.skillstwo = skillstwo;
//     if (skillsthree) userProfile.skillsthree = skillsthree;

//     await userProfile.save();

//     res.status(200).json(userProfile);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /*
//  * Remove Skills
//  * Test Data :
//  *
//  *
//  *
//  {
//   "arrayName": "skillsone",
//   "skill": "JavaScript"
// } 
// *
// *
// *
// */

// exports.removeSkill = async (req, res) => {
//   const { skill, arrayName } = req.body; // arrayName should be 'skillsone', 'skillstwo', or 'skillsthree'

//   try {
//     const userProfile = await User.findById(process.env.id);

//     if (!userProfile)
//       return res.status(404).json({ message: "User profile not found." });

//     if (["skillsone", "skillstwo", "skillsthree"].includes(arrayName)) {
//       userProfile[arrayName] = userProfile[arrayName].filter(
//         (item) => item !== skill
//       );
//       await userProfile.save();
//       res
//         .status(200)
//         .json({ message: "Skill removed successfully.", userProfile });
//     } else {
//       res.status(400).json({ message: "Invalid array name." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
