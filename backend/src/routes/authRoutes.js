import express from "express";
import { register, login, me, updateMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.route("/me").get(protect, me).put(protect, updateMe);

export default router;