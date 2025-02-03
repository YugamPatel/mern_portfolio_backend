import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Get token from cookies

    if (!token) return response(res, 401, "Unauthorized access,No Auth-token found", false);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return response(res, 401, "User not found", false);

    next();
  } catch (error) {
    response(res, 401, "Invalid token", false);
  }
};
