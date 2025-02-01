// ────────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ────────────────────────────────────────────────────────────────────────────────

import { User } from "../models/User.js"; // Adjust the import path as necessary
import { response } from "../helperFunctions/helper.js";

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLERS
// ────────────────────────────────────────────────────────────────────────────────

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    response(res, 200, "Success getting user", true, user);
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};



