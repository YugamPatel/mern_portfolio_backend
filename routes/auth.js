import express from "express";
const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

import {
  loginUser,
  logoutUser,
  updatePassword,
  verifyUser,
} from "../controllers/authController.js";

router.route("/verify").get(protect, verifyUser); 
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update-password").put(protect, updatePassword); // Requires authentication


export default router;
