import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";

// ────────────────────────────────────────────────────────────────────────────────
// 1️⃣ GET EDUCATION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const getEducation = async (req, res) => {
  try {
    const user = await User.findOne().select("education");
    if (!user) return response(res, 404, "User not found", false);

    response(
      res,
      200,
      "Education data retrieved successfully",
      true,
      user.education
    );
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
    if (!Array.isArray(education))
      return response(res, 400, "Invalid education format", false);

    const updatedUser = await User.findOneAndUpdate(
      {},
      { education },
      { new: true }
    );

    response(
      res,
      200,
      "Education updated successfully",
      true,
      updatedUser.education
    );
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
    if (!name || !date || !desc)
      return response(res, 400, "Missing education fields", false);

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $push: { education: { $each: [{ name, date, desc }], $position: 0 } } },
      { new: true }
    );

    response(
      res,
      201,
      "Education added at the top successfully",
      true,
      updatedUser.education
    );
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
    if (index < 0 || !name || !date || !desc)
      return response(res, 400, "Invalid input", false);

    const user = await User.findOne();
    if (!user) return response(res, 404, "User not found", false);

    const newEducation = { name, date, desc };
    user.education.splice(index, 0, newEducation); // Insert at the given index
    await user.save();

    response(
      res,
      201,
      "Education added at the specified index",
      true,
      user.education
    );
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

export const resetEducation = async (req, res) => {
  try {
    // Define the default education array
    const defaultEducation = [
      {
        name: "University of Manitoba",
        date: "2022 - Present",
        desc: "I am a Computer Science student enrolled in the co-op program at the University of Manitoba, where my passion for technology continues to grow. Eager and committed to expanding my knowledge and skills in the tech environment, I am constantly seeking opportunities to learn, develop, and apply my expertise in real-world settings.",
      },
      {
        name: "Green Valley High School",
        date: "2019 - 2021",
        desc: "Achieved my high school degree from Green Valley High School, excelling in Physics, Chemistry, and Maths. This rigorous academic journey allowed my analytical and problem-solving skills, laying a strong foundation in these core subjects.",
      },
      {
        name: "Bharatiya Vidya Bhavan's",
        date: "2009 - 2019",
        desc: "During my schooling up to the 10th grade at Bharatiya Vidya Bhavan's, I explored a wide range of subjects, including Physics, Chemistry, and Maths. This period was marked by a broad exploration of knowledge, allowing me to uncover my interests and strengths across different disciplines.",
      },
    ];

    // Update the user's education field with the default values
    const updatedUser = await User.findOneAndUpdate(
      {},
      { education: defaultEducation },
      { new: true }
    );

    // Send a success response with the updated education data
    response(
      res,
      200,
      "Education reset to default",
      true,
      updatedUser.education
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
