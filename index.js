import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/connectDb.js";
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 3000;
import testRouter from "./routes/test.js";
import errorHandler from "./middlewares/error.js";
import authRouter from "./routes/auth.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import userRouter from "./routes/user.js";
import heroRouter from "./routes/hero.js";
import aboutRouter from "./routes/about.js";
import modernAboutRouter from "./routes/modernAbout.js";
import educationRouter from "./routes/education.js";
import workRouter from "./routes/work.js";
// import { seedData } from "./initData/seed.js";

cloudinaryConfig();
connectDatabase();

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS Configuration
const corsOptions = {
  origin: "https://yugamazing.com",
  credentials: true, 
};

app.use(cors(corsOptions));

app.listen(PORT, () =>
  console.log(`server Running on Port: http://localhost:${PORT}`)
);

// ─── ROUTES ─────────────────────────────────────────────────────────────────────
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/api", userRouter);
app.use("/api/user/hero", heroRouter);
app.use("/api/user/about", aboutRouter);
app.use("/api/user/modern-about", modernAboutRouter);
app.use("/api/user/education", educationRouter);
app.use("/api/user/work", workRouter);

// seedData();

// ─── GLOBAL ERROR HANDLER ───────────────────────────────────────────────────────
app.use(errorHandler);

// ─── UNCAUGHT EXCEPTION HANDLER ─────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
// =================================================================================

// ─── UNHANDLED PROMISE REJECTION HANDLER ────────────────────────────────────────
process.on("unhandledrejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
// =================================================================================
