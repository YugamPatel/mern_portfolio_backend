import { response } from "../helperFunctions/helper.js";
import { User } from "../models/User.js";

// ────────────────────────────────────────────────────────────────────────────────
// GET MODERN ABOUT SECTION DATA
// ────────────────────────────────────────────────────────────────────────────────
export const getModernAboutMe = async (req, res) => {
  try {
    const user = await User.findOne().select("modernAbout");
    if (!user) return response(res, 404, "User not found", false, null);

    response(
      res,
      200,
      "Fetched modernAboutMe successfully",
      true,
      user.modernAbout
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// 3️⃣ RESET ENTIRE MODERN ABOUT SECTION TO DEFAULT
// ────────────────────────────────────────────────────────────────────────────────
export const resetModernAboutMe = async (req, res) => {
  const defaultModernAbout = {
    title: "I'm Yugam Patel",
    subTitle: "Explore More !",
    info: [
      {
        var: "Name",
        char: "=",
        str: "Yugam Patel",
      },
      {
        var: "School",
        char: "=",
        str: "University of Manitoba",
      },
      {
        var: "Degree",
        char: "=",
        str: "Bachelor of Science, Computer Science Major (Co-op Option)",
      },
      {
        var: "About",
        char: "=",
        str: "Hi i'm Yugam Patel, a Computer Science student at the University of Manitoba, deeply passionate about coding and learning new tech. My journey began with a simple 'Hello World' and has since evolved into a desire to make the digital world better. Skilled in Java and always eager to learn new technologies like Flutter, ReactJS, and AWS, I thrive on problem-solving and innovation. I believe in learning things that excites me and I'm currently open to co-op and job opportunities that match my expertise.",
      },
      {
        var: "Hobbies",
        char: "=",
        str: "Photography, Cooking, Community Work, Traveling, Watching Movies",
      },
    ],
  };
  try {
    const updatedUser = await User.findOneAndUpdate(
      {},
      { modernAbout: defaultModernAbout },
      { new: true, timestamps: true }
    );

    response(
      res,
      200,
      "modernAboutMe reset to default values",
      true,
      updatedUser.modernAbout
    );
  } catch (error) {
    response(res, 500, "Server error", false, error.message);
  }
};
