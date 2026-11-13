import express from "express";
import bookCtrl from "../controllers/bookController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(bookCtrl.list)
  .post(authorize("admin"), bookCtrl.create);

router.route("/:bookId")
  .get(bookCtrl.read)
  .put(authorize("admin"), bookCtrl.update)
  .delete(authorize("admin"), bookCtrl.remove);

router.param("bookId", bookCtrl.bookByID);

export default router;