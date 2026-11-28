import express from "express";
import borrowingCtrl from "../controllers/borrowingController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(authorize("admin"), borrowingCtrl.list)
  .post(authorize("member"), borrowingCtrl.create);

// "/me" goes before any "/:id" route so Express doesn't read "me" as an id
router.get("/me", borrowingCtrl.listMine);

router.patch("/:borrowingId/return", borrowingCtrl.returnBook);

router.param("borrowingId", borrowingCtrl.borrowingByID);

export default router;