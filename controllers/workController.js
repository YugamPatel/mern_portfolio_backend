import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";

export const updateWorkTimeline = async (req, res) => {
  const { userId } = process.env.id; // The user's ID from the URL parameter
  const { entryId } = req.params;
  const { mobileDec, isNotice } = req.body; // The fields to update

  if (!entryId) {
    return res.status(400).json({ message: "Missing entryId" });
  }

  try {
    // Construct the update object dynamically
    const updateFields = {};

    if (mobileDec !== undefined) {
      updateFields["workTimeline.$.mobileDec"] = mobileDec;
    }
    if (isNotice !== undefined) {
      updateFields["workTimeline.$.isNotice"] = isNotice;
    }

    // Find the user and update the specified workTimeline entry
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "workTimeline._id": entryId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or workTimeline entry not found" });
    }

    res.status(200).json({
      message: "Work timeline entry updated successfully",
      workTimeline: updatedUser.workTimeline,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating work timeline entry",
      error: error.message,
    });
  }
};

export const resetWork = async (req, res) => {
  try {
    // Define the default work array
    const defaultWork = [
      {
        name: "Looking for opportunities.",
        date: "Present",
        desc: "As a student in the University of Manitoba's co-op program, I am actively seeking Co-op opportunities in software development, with a particular interest in learning and working with .NET technologies. I am eager to apply my programming skills in a practical setting, gain hands-on experience in .NET development, and collaborate with experienced professionals on exciting projects. My goal is to gain expertise in .NET, contributing innovative solutions, and grow as a software developer while making meaningful impacts in a dynamic team.",
        mobileDec:
          "I am eagerly seeking software development internships, particularly in .NET development. Committed to applying my programming skills in real-world settings, I aim to learn from experts and contribute to meaningful projects. My goal is to excel in .NET development and make valuable contributions to a team while growing professionally.",
        isNotice: true,
      },
      {
        name: "Home Depot",
        date: "Apr 2024 - Present",
        desc: "Got promoted from Seasonal Sales Associate to Special Services Associate at Home Depot for outstanding customer service. I assist pro customers with tax redemption, billing paperwork, and specialized purchasing needs, while also facilitating project loan and Home Depot credit card applications.By consistently resolving customer queries and providing excellent assistance, I have contributed to a 30% increase in positive Voice of Customer (VOC) surveys.",
      },
      {
        name: "Kognitive Sales Solutions",
        date: "Aug 2022 - Jan 2024",
        desc: "In my role as a Field Marketing Representative with Kognitive Sales Solutions, I specialized in promoting the Triangle Mastercard at Canadian Tire. My responsibilities included explaining the card's benefits to potential customers, assisting with application processes, and ensuring compliance with privacy standards.",
      },
    ];

    // Update the user's work field with the default values
    const updatedUser = await User.findOneAndUpdate(
      {},
      { work: defaultWork },
      { new: true }
    );

    // Send a success response with the updated work data
    response(res, 200, "Work section reset to default", true, updatedUser.work);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
