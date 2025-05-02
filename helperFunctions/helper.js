import cloudinary from "cloudinary";

// ────────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────
  
  export const response = (res, statusCode, message, success = true, output) => {
    if (!success) {
      return res.status(statusCode).json({ success, message, output });
    }
    return res.status(statusCode).json({ success, message, output });
  };