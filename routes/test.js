import express from "express";
const router = express.Router();
import { imageUpload , deleteSkills,addSkills} from "../controllers/testControllers.js";

// router.route('/').get(imageUpload) ;
router.route('/imageUpload').post(imageUpload) ;
router.route('/deleteSkills').delete(deleteSkills) ;
router.route('/addSkills').post(addSkills) ;

export default router;
