// backend/middleware/upload.js
import multer from "multer";

// memory storage so we can pipe to Cloudinary directly
const storage = multer.memoryStorage();
export const upload = multer({ storage });
