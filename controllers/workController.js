import { User } from "../models/User";

export const addEducationEntry = async (req, res) => {
  const userId = process.env.id;
  const newEducationEntry = req.body.newEducationEntry;

  if (!newEducationEntry || !userId) {
    return res.status(400).json({ message: "Missing required information" });
  }

  try {
    // Find the user by ID and update their education timeline
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        // Use $push operator to add the new education entry to the array
        $push: { educationTimeline: newEducationEntry },
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user document
    res.status(200).json({
      message: "Education timeline updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating education timeline",
      error: error.message,
    });
  }
};

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
