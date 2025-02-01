import express from "express";
const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

import {
  loginUser,
  logoutUser,
  updatePassword,
  resetPassword,
} from "../controllers/authController.js";

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update-password").put(protect, updatePassword); // Requires authentication
router.route("/reset-password").patch(protect, resetPassword); // Requires authentication

export default router;
