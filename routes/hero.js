import express from "express";
const router = express.Router();
import {
  getHero,
  updateHero,
  resetHero,
  resetHeroTitle,
  resetHeroSubTitle,
  resetSocialLinks,
  resetTypewriter,
  resetButton,
} from "../controllers/heroController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").get(getHero);
router.route("/").put(protect, updateHero);
router.patch("/reset", protect, resetHero);
router.patch("/reset/title", protect, resetHeroTitle);
router.patch("/reset/subtitle", protect, resetHeroSubTitle);
router.patch("/reset/socialLinks", protect, resetSocialLinks);
router.patch("/reset/typewriter", protect, resetTypewriter);
router.patch("/reset/button", protect, resetButton);

export default router;
