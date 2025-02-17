import express from "express";
import { getModernAboutMe, resetModernAboutMe } from "../controllers/modernAboutController.js";

const router = express.Router();

router.get("/", getModernAboutMe);

router.patch("/reset", resetModernAboutMe);

export default router;
