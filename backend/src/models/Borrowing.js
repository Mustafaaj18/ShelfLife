import mongoose from "mongoose";

const BorrowingSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  book: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    title: String,
  },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedDate: Date,
  status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
});

export default mongoose.model("Borrowing", BorrowingSchema);