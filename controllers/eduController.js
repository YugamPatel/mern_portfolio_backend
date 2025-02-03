import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";

// ────────────────────────────────────────────────────────────────────────────────
// 1️⃣ GET EDUCATION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const getEducation = async (req, res) => {
  try {
    const user = await User.findOne().select("education");
    if (!user) return response(res, 404, "User not found", false);

    response(res, 200, "Education data retrieved successfully", true, user.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 2️⃣ UPDATE ENTIRE EDUCATION ARRAY
// ────────────────────────────────────────────────────────────────────────────────
export const updateEducation = async (req, res) => {
  try {
    const { education } = req.body;
    if (!Array.isArray(education)) return response(res, 400, "Invalid education format", false);

    const updatedUser = await User.findOneAndUpdate({}, { education }, { new: true });

    response(res, 200, "Education updated successfully", true, updatedUser.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 3️⃣ ADD EDUCATION ENTRY AT THE TOP
// ────────────────────────────────────────────────────────────────────────────────
export const addEducationTop = async (req, res) => {
  try {
    const { name, date, desc } = req.body;
    if (!name || !date || !desc) return response(res, 400, "Missing education fields", false);

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $push: { education: { $each: [{ name, date, desc }], $position: 0 } } },
      { new: true }
    );

    response(res, 201, "Education added at the top successfully", true, updatedUser.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 4️⃣ ADD EDUCATION ENTRY AT A SPECIFIC INDEX
// ────────────────────────────────────────────────────────────────────────────────
export const addEducationAtIndex = async (req, res) => {
  try {
    const { index, name, date, desc } = req.body;
    if (index < 0 || !name || !date || !desc) return response(res, 400, "Invalid input", false);

    const user = await User.findOne();
    if (!user) return response(res, 404, "User not found", false);

    const newEducation = { name, date, desc };
    user.education.splice(index, 0, newEducation); // Insert at the given index
    await user.save();

    response(res, 201, "Education added at the specified index", true, user.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 5️⃣ DELETE EDUCATION ENTRY AT A SPECIFIC INDEX
// ────────────────────────────────────────────────────────────────────────────────
export const deleteEducationAtIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const parsedIndex = parseInt(index);

    const user = await User.findOne();
    if (!user) return response(res, 404, "User not found", false);

    if (parsedIndex < 0 || parsedIndex >= user.education.length)
      return response(res, 400, "Invalid index", false);

    user.education.splice(parsedIndex, 1); // Remove item at index
    await user.save();

    response(res, 200, "Education entry deleted", true, user.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 6️⃣ UPDATE A SPECIFIC EDUCATION ENTRY
// ────────────────────────────────────────────────────────────────────────────────
export const updateEducationAtIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const { name, date, desc } = req.body;
    const parsedIndex = parseInt(index);

    const user = await User.findOne();
    if (!user) return response(res, 404, "User not found", false);

    if (parsedIndex < 0 || parsedIndex >= user.education.length)
      return response(res, 400, "Invalid index", false);

    if (name) user.education[parsedIndex].name = name;
    if (date) user.education[parsedIndex].date = date;
    if (desc) user.education[parsedIndex].desc = desc;

    await user.save();

    response(res, 200, "Education entry updated", true, user.education);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
