import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Starter endpoint. The team will add book CRUD routes here.
router.get("/", protect, (req, res) => {
  res.json({
    success: true,
    message: "Book API is ready for development",
    data: []
  });
});

export default router;