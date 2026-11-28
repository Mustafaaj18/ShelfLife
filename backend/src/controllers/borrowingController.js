import Borrowing from "../models/Borrowing.js";
import Book from "../models/Book.js";
import { safeError } from "../utils/errors.js";

const LOAN_DAYS = 14;

// Member borrows a book
const create = async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    // Not fully race-proof if two members click at the same instant (fine for this project)
    if (book.status === "borrowed")
      return res.status(409).json({ error: "Book is already borrowed" });

    const dueDate = new Date(Date.now() + LOAN_DAYS * 24 * 60 * 60 * 1000);
    const borrowing = await new Borrowing({
      user: { id: req.user._id, name: req.user.name },
      book: { id: book._id, title: book.title },
      dueDate,
    }).save();

    book.status = "borrowed";
    book.updated = Date.now();
    await book.save();

    return res.status(201).json(borrowing);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

// Admin: every borrowing record
const list = async (req, res) => {
  try {
    const records = await Borrowing.find().sort({ borrowedDate: -1 });
    res.json(records);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

// Signed-in user: only their own records
const listMine = async (req, res) => {
  try {
    const records = await Borrowing.find({ "user.id": req.user._id }).sort({ borrowedDate: -1 });
    res.json(records);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

// router.param: loads the record into req.borrowing
const borrowingByID = async (req, res, next, id) => {
  try {
    const borrowing = await Borrowing.findById(id);
    if (!borrowing) return res.status(404).json({ error: "Borrowing record not found" });
    req.borrowing = borrowing;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve borrowing record" });
  }
};

// Return a book (owner or admin)
const returnBook = async (req, res) => {
  try {
    const borrowing = req.borrowing;
    if (req.user.role !== "admin" && !borrowing.user.id.equals(req.user._id))
      return res.status(403).json({ error: "Not allowed" });
    if (borrowing.status === "returned")
      return res.status(409).json({ error: "Book already returned" });

    borrowing.status = "returned";
    borrowing.returnedDate = Date.now();
    await borrowing.save();

    const book = await Book.findById(borrowing.book.id);
    if (book) {
      book.status = "available";
      book.updated = Date.now();
      await book.save();
    }

    res.json(borrowing);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

export default { create, list, listMine, borrowingByID, returnBook };