// ────────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ────────────────────────────────────────────────────────────────────────────────

import mongoose from "mongoose";

// ────────────────────────────────────────────────────────────────────────────────
// USER SCHEMA DEFINITION
// ────────────────────────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema(
  {
    // ─── USER IDENTIFICATION ──────────────────────────────────────────────────────
    userName: {
      type: String,
      unique: true,
      select: false,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },

    // ─── HOME SECTION ─────────────────────────────────────────────────────────────
    home: {
      mainString: {
        type: String,
        required: [true, "Main string in home section is required"],
      },
      intro: {
        type: String,
        required: [true, "Who am I field in home section is required"],
      },
      banner_img: {
        // Banner Image
        // IMAGE
        public_id: String,
        url: String,
      },
      profile_img: {
        // Profile Image
        // IMAGE
        public_id: String,
        url: String,
      },
      randomBackground: {
        type: Boolean,
        default: true,
      },
      background: {
        // Body Background Image
        // IMAGE
        public_id: String,
        url: String,
      },

      // background_color: {
      //   // Body Background Color
      //   type: String,
      //   default: "#ffffff",
      //   required: [true, "Background color in home section is required"],
      // },

      typewriter: [
        {
          // Typewriter Texts
          type: String,
          required: [true, "Typewriter text in home section is required"],
        },
      ],
    },

    // ─── ABOUT SECTION ────────────────────────────────────────────────────────────
    about: {
      aboutImage: {
        // IMAGE
        public_id: String,
        url: String,
      },
      aboutImageBack: {
        // IMAGE
        public_id: String,
        url: String,
      },
      logo: {
        // IMAGE
        public_id: String,
        url: String,
      },
      mobileLogo: {
        // IMAGE
        public_id: String,
        url: String,
      },
      textP1: {
        type: String,
        required: [true, "First paragraph text in about section is required"],
        default: "",
      },
      textP2: {
        type: String,
        required: [true, "Second paragraph text in about section is required"],
        default: "",
      },
    },

    // ─── MODERN ABOUT SECTION ─────────────────────────────────────────────────────
    modernAbout: {
      page: {
        pageName: {
          type: String,
          required: [true, "Page name in modern about section is required"],
          default: "I'm Yugam Patel",
        },
        caption: {
          type: String,
          required: [true, "Caption in modern about section is required"],
          default: "Explore More !",
        },
      },
      card: {
        name: {
          type: String,
          required: [true, "Name in modern about card is required"],
          default: "Yugam Patel",
        },
        age: {
          type: Number,
          required: [true, "Age in modern about card is required"],
          default: 20,
        },
        aboutText: {
          type: String,
          required: [true, "About text in modern about card is required"],
        },
        profession: {
          type: String,
          default: "",
        },
        topSkills: [{ type: String }],
        moreSkills: [
          {
            header: { type: String },
            skills: [{ type: String }],
          },
        ],
      },
    },

    // ─── EDUCATION AND WORK TIMELINES ─────────────────────────────────────────────
    educationTimeline: [
      {
        startDate: Date,
        endDate: Date,
        title: String,
        description: String,
      },
    ],
    workTimeline: [
      {
        startDate: Date,
        endDate: Date,
        title: String,
        description: String,
      },
    ],

    // ─── SKILLS ───────────────────────────────────────────────────────────────────
    skillsone: [
      {
        type: String,
      },
    ],
    skillstwo: [
      {
        type: String,
      },
    ],
    skillsthree: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// ────────────────────────────────────────────────────────────────────────────────
// MODEL EXPORT
// ────────────────────────────────────────────────────────────────────────────────

export const User = mongoose.model("User", userSchema);
