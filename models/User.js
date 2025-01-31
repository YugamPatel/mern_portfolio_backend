// ────────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ────────────────────────────────────────────────────────────────────────────────
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ────────────────────────────────────────────────────────────────────────────────
// USER SCHEMA DEFINITION
// ────────────────────────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema(
  {
    // ─── USER IDENTIFICATION ──────────────────────────────────────────────────────
    username: {
      type: String,
      unique: true,
      select: false,
    },
    password: {
      type: String,
      select: false,
    },

    // ─── HOME SECTION ─────────────────────────────────────────────────────────────
    home: {
      heroImage: {
        isRandom: {
          type: Boolean,
          default: true,
        },
        randomImage: {
          type: String,
          default:
            "https://source.unsplash.com/random/?&mountains&forest&gradient&galaxy&ocean&landscape",
        },

        img: {
          // IMAGE
          public_id: String,
          url: String,
        },
      },

      profileImage: {
        img: {
          // IMAGE
          public_id: String,
          url: String,
        },
        style: {
          scale: {
            type: Number,
            default: 2.4,
          },
          transform: {
            type: String,
            default: "center 10px",
          },
        },
      },

      heroTitle: {
        intro: {
          type: String,
          default: "Hi, I'm",
        },
        name: {
          type: String,
          default: "Yugam.",
        },
      },

      heroSubtitle: {
        subTitle: {
          type: String,
          default: "And i am a,",
        },
        sheryConfig: {
          style: {
            type: Number,
            default: 1,
          },
          y: {
            type: Number,
            default: 10,
          },
          delay: {
            type: Number,
            default: 0.2,
          },
          duration: {
            type: Number,
            default: 0.3,
          },
          ease: {
            type: String,
            default: "ease",
          },
          multiplier: {
            type: Number,
            default: 0.1,
          },
        },
      },

      socialLinks: [
        {
          name: {
            type: String,
            required: [true, "Social link name is required"],
          },
          url: {
            type: String,
            required: [true, "Social link URL is required"],
          },
          iconClass: {
            type: String,
            required: [true, "Social icon class is required"],
          },
        },
      ],

      typewriter: [
        {
          type: String,
        },
      ],

      button: {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },

    // ───ABOUT SECTION ─────────────────────────────────────────────────────
    about: {
      frontPhoto: {
        // IMAGE
        public_id: String,
        url: String,
      },
      backPhoto: {
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
        default:
          "Hello, I'm Yugam, a MERN,Full Stack and Flutter Developer. I merge technical expertise with effective communication and problem-solving skills to deliver outstanding projects with impressive presentation",
      },
      textP2: {
        type: String,
        default:
          "As a Computer Science student at the University of Manitoba, my passion for technology drives me. Committed to continuous learning, I embrace the dynamic tech industry, eager to contribute and collaborate",
      },
    },

    // ─── MODERN ABOUT SECTION ─────────────────────────────────────────────────────
    modernAbout: {
      title: {
        type: String,
        default: "I'm Yugam Patel",
      },
      subTitle: {
        type: String,
        default: "Explore More !",
      },
      info: [
        {
          var: {
            type: String,
            required: [true, "var is modern about section is required"],
          },
          char: {
            type: String,
            required: [true, "char is modern about section is required"],
          },
          str: {
            type: String,
            required: [true, "str is modern about section is required"],
          },
        },
      ],
    },

    // ─── EDUCATION AND WORK TIMELINES ─────────────────────────────────────────────
    educationTimeline: [
      {
        date: String,
        title: String,
        description: String,
      },
    ],
    workTimeline: [
      {
        date: String,
        title: String,
        description: String,
        mobileDec: String,
        isNotice: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // ─── SKILLS ───────────────────────────────────────────────────────────────────
    skillsOne: [
      {
        type: String,
      },
    ],
    skillsTwo: [
      {
        type: String,
      },
    ],
    softSkills: [
      {
        type: String,
      },
    ],
    // ─── Contact ───────────────────────────────────────────────────────────────────

    contact: {
      heading: String,
      contactInfo: {
        email: String,
        phone: String,
      },
      scriptURL: {
        type: String,
      },
      socialLinks: [
        {
          name: {
            type: String,
            required: [true, "Social link name is required"],
          },
          url: {
            type: String,
            required: [true, "Social link URL is required"],
          },
          iconClass: {
            type: String,
            required: [true, "Social icon class is required"],
          },
        },
      ],
      button: {
        text: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      sendButton: {
        text: String,
        onClick: String,
        failureMessage: String,
        successMessage: String,
      },
      curseWordsLangs: [
        {
          type: String,
        },
      ],
      successMessage: String,
      failureMessage: String,
      inappropriateMessage: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Anything you want to run or change before the creation or saving of the user model will be managed by the line below.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ────────────────────────────────────────────────────────────────────────────────
// MODEL EXPORT
// ────────────────────────────────────────────────────────────────────────────────

export const User = mongoose.model("User", userSchema);
