import cloudinary from "cloudinary";

// ────────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

export const uploadImageToCloudinary = async (userField, imagePath, folderPath) => {
    if (userField?.public_id) {
      await cloudinary.v2.uploader.destroy(userField.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(imagePath, {
      folder: folderPath,
    });
    return {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  };
  
  export const response = (res, statusCode, message, success = true, output) => {
    if (!success) {
      return res.status(statusCode).json({ success, message });
    }
    return res.status(statusCode).json({ success, message, output });
  };