import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authrouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
// import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectDB();
app.use(express.json());
app.use(cookieParser());
// Must be above all routes
app.use(cors({
  origin: "https://book-review-eight-sand.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authrouter);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
