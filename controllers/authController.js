import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";
import ErrorResponse from "../utils/errorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ────────────────────────────────────────────────────────────────────────────────
// 1️⃣ USER LOGIN - Sets an authentication cookie
// ────────────────────────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ username }).select("+password");
    if (!user) return response(res, 401, "Invalid username or password", false);

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response(res, 401, "Invalid username or password", false);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the signed cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Protect from client-side JS
      secure: process.env.NODE_ENV === "production", // Only set secure flag in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    response(res, 200, "Login successful", true, { token });
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 2️⃣ USER LOGOUT - Clears the authentication cookie
// ────────────────────────────────────────────────────────────────────────────────
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    response(res, 200, "Logout successful", true);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 3️⃣ UPDATE PASSWORD - Requires current password for verification
// ────────────────────────────────────────────────────────────────────────────────
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user) return response(res, 401, "Unauthorized access", false);

    // Find user by ID
    const user = await User.findById(req.user.id).select("+password");
    if (!user) return response(res, 404, "User not found", false);

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return response(res, 400, "Incorrect current password", false);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated password
    await user.save();

    response(res, 200, "Password updated successfully", true);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 4️⃣ RESET PASSWORD - Sets password to "0000"
// ────────────────────────────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(process.env.RESET_PASSWORD, salt);
    await user.save();
    response(res, 200, "Password reset successfully", true);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
