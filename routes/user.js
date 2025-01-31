import express from "express";
const router = express.Router();
import { getUser } from "../controllers/userController.js";

router.route("/").get(getUser);

export default router;
