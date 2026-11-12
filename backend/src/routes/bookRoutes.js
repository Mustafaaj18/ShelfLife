import express from "express";
import bookCtrl from "../controllers/bookController.js";

const router = express.Router();

router.route("/")
  .get(bookCtrl.list)
  .post(bookCtrl.create);

router.route("/:bookId")
  .get(bookCtrl.read)
  .put(bookCtrl.update)
  .delete(bookCtrl.remove);

router.param("bookId", bookCtrl.bookByID);

export default router;