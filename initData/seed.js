import { User } from "../models/User.js";
import mongoose from "mongoose";

export const seedData = async () => {
  try {
    // Check if user data already exists
    const existingUser = await User.findOne();
    if (existingUser) {
      console.log("User data already exists. Skipping upload.");
      mongoose.disconnect();
      return;
    }

    // Insert default data
    await User.create({
      username: "yugam",
      password: "yugampatel", // bcrypt will hash this in `pre-save`

      hero: {
        heroImage: {
          isRandom: false,
          randomImg:
            "https://source.unsplash.com/random/?&mountains&forest&gradient&galaxy&ocean&landscape",
          img: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        profileImage: {
          img: "https://res.cloudinary.com/dwig4hupj/image/upload/v1736968666/img2_wfcmtu.jpg",
          style: {
            transform: "scale(2.8)",
            objectPosition: "0px 10px",
          },
        },
        heroTitle: {
          intro: "Hi, I'm",
          name: "Yugam.",
        },
        heroSubTitle: {
          subTitle: "And I am a,",
        },
        socialLinks: [
          {
            name: "Facebook",
            url: "https://www.facebook.com/yugampatel/",
            iconClass: "fa-brands fa-facebook",
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com/its.yugam/",
            iconClass: "fa-brands fa-instagram",
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/yugampatel/",
            iconClass: "fa-brands fa-linkedin",
          },
          {
            name: "GitHub",
            url: "https://github.com/YugamPatel/",
            iconClass: "fa-brands fa-github",
          },
        ],
        typewriter: [
          "< MERN Stack Developer />",
          "=> ( Js Developer )",
          "AWS Certified Developer",
          "( Flutter Developer )",
          "{ Java Developer }",
          "{ Co-op Student }",
        ],
        button: {
          name: "Download Resume",
          url: "https://drive.google.com/file/d/1KKZr2A57vq246mbtlaWcooCoVDqyiRtK/view?usp=sharing",
        },
      },

      about: {
        frontPhoto:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707072392/portfolio/about/aboutImage/o6j5ehbsxha1bparz8cz.jpg",
        backPhoto:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707097539/portfolio/about/vhtose4jdeupelcqnrd1.jpg",
        logo: "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/wrtlzo9obttluvozjmf0.png",
        mobileLogo:
          "https://res.cloudinary.com/dwig4hupj/image/upload/v1707071310/uawcp9hroyofui2umbdb.png",
        textP1: "Hello, I'm Yugam, a MERN, Full Stack and Flutter Developer...",
        textP2:
          "As a Computer Science student at the University of Manitoba...",
      },

      modernAbout: {
        title: "I'm Yugam Patel",
        subTitle: "Explore More !",
        info: [
          { var: "Name", char: "=", str: "Yugam Patel" },
          { var: "School", char: "=", str: "University of Manitoba" },
          {
            var: "Degree",
            char: "=",
            str: "Bachelor of Science, Computer Science Major (Co-op Option)",
          },
          {
            var: "About",
            char: "=",
            str: "Hi, I'm Yugam Patel, a Computer Science student at the University of Manitoba...",
          },
          {
            var: "Hobbies",
            char: "=",
            str: "Photography, Cooking, Community Work, Traveling and Watching Movies",
          },
        ],
      },

      education: [
        {
          name: "University of Manitoba",
          date: "2022 - Present",
          desc: "Computer Science student enrolled in the co-op program at the University of Manitoba.",
        },
        {
          name: "Green Valley High School",
          date: "2019 - 2021",
          desc: "Achieved my high school degree, excelling in Physics, Chemistry, and Maths.",
        },
        {
          name: "Bharatiya Vidya Bhavan's",
          date: "2009 - 2019",
          desc: "Explored a wide range of subjects, including Physics, Chemistry, and Maths.",
        },
      ],

      work: [
        {
          name: "Looking for opportunities.",
          date: "Present",
          desc: "Seeking Co-op opportunities in software development, particularly in .NET.",
        },
        {
          name: "Home Depot",
          date: "Apr 2024 - Present",
          desc: "Promoted to Special Services Associate at Home Depot for outstanding customer service.",
        },
        {
          name: "Kognitive Sales Solutions",
          date: "Aug 2022 - Jan 2024",
          desc: "Field Marketing Representative specializing in promoting the Triangle Mastercard at Canadian Tire.",
        },
      ],

      skillsOne: [
        "JavaScript",
        "React.js",
        "Vite.js",
        "Node.js",
        "Github",
        "Git",
        "Thunder-Client",
        "HTML",
        "CSS",
        "SCSS",
        "MongoDB",
        "Netlify",
        "Java",
        "Mongoose",
      ],
      skillsTwo: [
        "AWS",
        "Unix",
        "SQL",
        "Express",
        "REST APIs",
        "GSAP",
        "Framer Motion",
        "Flutter",
        "Responsive Design",
        "Bootstrap",
        "Tailwind CSS",
        "Redux",
        "Redux Toolkit",
      ],
      softSkills: [
        "Problem Solving",
        "Teamwork",
        "Leadership",
        "Communication",
        "Agile Methodology",
        "Critical Thinking",
      ],

      contact: {
        heading: "Let's get in touch",
        contactInfo: {
          email: "yugampatel@gmail.com",
          phone: "+1 204-970-1007",
        },
        socialLinks: [
          {
            name: "Facebook",
            url: "https://www.facebook.com/yugampatel/",
            iconClass: "fa-brands fa-facebook",
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com/its.yugam/",
            iconClass: "fa-brands fa-instagram",
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/yugampatel/",
            iconClass: "fa-brands fa-linkedin",
          },
          {
            name: "GitHub",
            url: "https://github.com/YugamPatel/",
            iconClass: "fa-brands fa-github",
          },
        ],
        button: {
          text: "Download Resume",
          url: "https://drive.google.com/file/d/1KKZr2A57vq246mbtlaWcooCoVDqyiRtK/view?usp=sharing",
        },
      },
    });

    console.log("Default data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data:", error);
  } finally {
    mongoose.disconnect();
  }
};
