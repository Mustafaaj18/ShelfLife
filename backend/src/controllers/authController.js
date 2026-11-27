import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sendToken = (res, status, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d" });
  res.status(status).json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.create({ name, email, password }); // role is always "member"
    sendToken(res, 201, user);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: "Email already registered" });
    res.status(400).json({ message: "Name, email and a password of 8+ characters are required" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });
    sendToken(res, 200, user);
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

// GET /api/auth/me  (logged-in user reads own profile)
export const me = (req, res) => {
  const { name, email, role } = req.user;
  res.json({ name, email, role });
};

// PUT /api/auth/me  (logged-in user edits own name/email, never role)
export const updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (name) req.user.name = name;
    if (email) req.user.email = email;
    req.user.updated = Date.now();
    await req.user.save();
    res.json({ name: req.user.name, email: req.user.email, role: req.user.role });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email already registered" });
    res.status(400).json({ message: "Could not update profile" });
  }
};