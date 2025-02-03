import express from "express";
import {
  getEducation,
  updateEducation,
  addEducationTop,
  addEducationAtIndex,
  deleteEducationAtIndex,
  updateEducationAtIndex,
} from "../controllers/eduController.js";

const router = express.Router();

router.get("/", getEducation);
router.put("/", updateEducation);
router.post("/add", addEducationTop);
router.post("/addAtIndex", addEducationAtIndex);
router.delete("/:index", deleteEducationAtIndex);
router.put("/:index", updateEducationAtIndex);

export default router;
