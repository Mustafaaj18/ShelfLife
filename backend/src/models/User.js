import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: "Email already exists",
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["member", "admin"],
    default: "member",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

// Hash the password before saving the user
UserSchema.pre("save", async function () {
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
});

// Compare a typed password with the saved hashed password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);