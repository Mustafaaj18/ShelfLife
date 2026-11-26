import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, me, updateMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Max 10 failed sign-in/sign-up attempts per 15 minutes from the same IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.route("/me").get(protect, me).put(protect, updateMe);

export default router;