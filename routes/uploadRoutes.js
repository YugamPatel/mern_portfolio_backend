import express from "express";
import { uploadProfileImage } from "../controllers/uploadController.js";
import { upload } from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// POST /api/upload/profile
router
  .route("/profile")
  .post(protect, upload.single("image"), uploadProfileImage);

export default router;
