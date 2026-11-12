import "dotenv/config";
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

connectDB();

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shelf Life API running on http://localhost:${PORT}`);
});