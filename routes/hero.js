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
} from "../controllers/heroControllers.js";

router.route("/").get(getHero);
router.route("/").put(updateHero);
router.patch("/reset", resetHero);
router.patch("/reset/title", resetHeroTitle);
router.patch("/reset/subtitle", resetHeroSubTitle);
router.patch("/reset/socialLinks", resetSocialLinks);
router.patch("/reset/typewriter", resetTypewriter);
router.patch("/reset/button", resetButton);

export default router;
