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
    username: { type: String, unique: true, required: true, select: false },
    password: { type: String, required: true, select: false },

    // ─── HERO SECTION ─────────────────────────────────────────────────────────────
    hero: {
      heroImage: {
        isRandom: { type: Boolean, default: false },
        randomImg: {
          type: String,
          default:
            "https://source.unsplash.com/random/?&mountains&forest&gradient&galaxy&ocean&landscape",
        },
        img: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      profileImage: {
        img: {
          type: String,
          default:
            "https://res.cloudinary.com/dwig4hupj/image/upload/v1736968666/img2_wfcmtu.jpg",
        },
        style: {
          transform: { type: String },
          objectPosition: { type: String },
        },
      },
      heroTitle: {
        intro: { type: String },
        name: { type: String },
      },
      heroSubTitle: { subTitle: { type: String } },
      socialLinks: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
          iconClass: { type: String, required: true },
        },
      ],
      typewriter: [{ type: String }],
      button: {
        name: { type: String },
        url: {
          type: String,
          default:
            "https://drive.google.com/file/d/1KKZr2A57vq246mbtlaWcooCoVDqyiRtK/view?usp=sharing",
        },
      },
    },

    // ─── ABOUT SECTION ─────────────────────────────────────────────────────
    about: {
      frontPhoto: {
        type: String,
        default:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707072392/portfolio/about/aboutImage/o6j5ehbsxha1bparz8cz.jpg",
      },
      backPhoto: {
        type: String,
        default:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707097539/portfolio/about/vhtose4jdeupelcqnrd1.jpg",
      },
      logo: {
        type: String,
        default:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/wrtlzo9obttluvozjmf0.png",
      },
      mobileLogo: {
        type: String,
        default:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/uawcp9hroyofui2umbdb.png",
      },
      textP1: { type: String, required: true },
      textP2: { type: String, required: true },
    },

    // ─── EDUCATION AND WORK TIMELINES ─────────────────────────────────────────────
    education: [
      {
        name: { type: String, required: true },
        date: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    
    work: [
      {
        name: { type: String, required: true },
        date: { type: String, required: true },
        desc: { type: String, required: true },
        mobileDec: { type: String },
        isNotice: { type: Boolean, default: false },
      },
    ],

    // ─── SKILLS ───────────────────────────────────────────────────────────────────
    skillsOne: [{ type: String }],
    skillsTwo: [{ type: String }],
    softSkills: [{ type: String }],

    // ─── CONTACT SECTION ──────────────────────────────────────────────────────────
    contact: {
      heading: { type: String, required: true },
      contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },
      socialLinks: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
          iconClass: { type: String, required: true },
        },
      ],
      button: {
        text: { type: String },
        url: { type: String },
      },
    },
  },
  { timestamps: true }
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
