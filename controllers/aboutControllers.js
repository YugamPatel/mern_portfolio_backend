import { uploadImageToCloudinary } from "../helperFunctions/helper.js";
import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";

export const updateAboutInfo = async (req, res) => {
  try {
    const user = await User.findById(process.env.USER_ID);

    if (!user) {
      return response(res, 404, "User not found", false, null);
    }

    const { frontPhoto, backPhoto, logo, mobileLogo, textP1, textP2 } =
      req.body;

    if (textP1) user.about.textP1 = textP1;
    if (textP2) user.about.textP2 = textP2;

    if (frontPhoto) {
      const frontPhotoUploadResult = await uploadImageToCloudinary(
        user.about.frontPhoto,
        frontPhoto,
        "portfolio/about/frontPhoto"
      );
      user.about.frontPhoto = frontPhotoUploadResult;
    }

    if (backPhoto) {
      const backPhotoUploadResult = await uploadImageToCloudinary(
        user.about.backPhoto,
        backPhoto,
        "portfolio/about/backPhoto"
      );
      user.about.backPhoto = backPhotoUploadResult;
    }

    if (logo) {
      const logoUploadResult = await uploadImageToCloudinary(
        user.about.logo,
        logo,
        "portfolio/about/logo"
      );
      user.about.logo = logoUploadResult ;
    }

    if (mobileLogo) {
      const mobileLogoUploadResult = await uploadImageToCloudinary(
        user.about.mobileLogo,
        mobileLogo,
        "portfolio/about/mobileLogo"
      );
      user.about.mobileLogo = mobileLogoUploadResult;
    }

    await user.save();
    response(
      res,
      200,
      "About information updated successfully",
      true,
      user.about
    );
  } catch (error) {
    console.error("Failed to update about details:", error);
    response(res, 500, "Server error", false, error.message);
  }
};
