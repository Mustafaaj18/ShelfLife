import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)
  throw new Error("JWT_SECRET is missing from .env or is shorter than 32 characters");

const app = express();

app.set("trust proxy", 1); // lets the login limit see real visitor IPs on cloud hosts
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Catch-all error handler: never send stack traces or file paths to the user
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: status === 400 ? "Invalid request" : "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Shelf Life API running on http://localhost:${PORT}`);
  });
});