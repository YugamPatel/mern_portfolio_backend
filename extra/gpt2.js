import jwt from "jsonwebtoken";
import { Admin } from "../models/AdminModel.js"; // Adjust import path as needed

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token validity period
      });

      res.json({
        success: true,
        token,
      });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
