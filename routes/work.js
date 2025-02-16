import express from "express";
import {
resetWork
} from "../controllers/workController.js";

const router = express.Router();

router.patch("/reset", resetWork);

export default router;