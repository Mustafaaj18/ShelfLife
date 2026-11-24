import Book from "../models/Book.js";
import { safeError } from "../utils/errors.js";

const create = async (req, res) => {
  try {
    const book = await new Book(req.body).save();
    return res.status(200).json(book);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

const list = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

const bookByID = async (req, res, next, id) => {
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    req.book = book;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve book" });
  }
};

const read = (req, res) => {
  return res.json(req.book);
};

const update = async (req, res) => {
  try {
    const book = Object.assign(req.book, req.body);
    book.updated = Date.now();
    await book.save();
    res.json(book);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.book.deleteOne();
    res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: safeError(err) });
  }
};

export default { create, list, bookByID, read, update, remove };