import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  author: {
    type: String,
    trim: true,
    required: "Author is required",
  },
  genre: {
    type: String,
    trim: true,
  },
  isbn: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Book", BookSchema);