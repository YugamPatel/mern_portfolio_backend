import { User } from "../models/User.js";
import { response } from "../helperFunctions/helper.js";
import ErrorResponse from "../utils/errorResponse.js";


export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Email or Password field is missing", 401));
  }

  try {
    const user = await User.findOne({ username }).select("+password");
    const compare = await user.matchPassword(password);

    if (compare) {
      response(res, 200, "Login successful", true, user);
    } else {
      return next(new ErrorResponse("Incorrect credentials", 404));
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      userError: "User not found please check if your email is correct",
      developerError: error.message,
    });
  }
};
