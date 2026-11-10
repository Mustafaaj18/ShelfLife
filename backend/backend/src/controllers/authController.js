const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sendToken = (res, status, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(status).json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

// POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.create({ name, email, password }); // role is always "member"
    sendToken(res, 201, user);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email already registered" });
    res.status(400).json({ message: "Name, email and a password of 8+ characters are required" });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
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