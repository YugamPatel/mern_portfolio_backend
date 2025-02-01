import express from "express";
import {
  getAbout,
  updateAbout,
  resetAbout,
  resetAboutText,
  resetAboutImages,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout);
router.patch("/reset", resetAbout);
router.patch("/reset/text", resetAboutText);
router.patch("/reset/images", resetAboutImages);

export default router;
