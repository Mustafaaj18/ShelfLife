import express from "express";
import userCtrl from "../controllers/userController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Only logged-in admins can manage users. Normal sign-up uses /api/auth/register.
router.use(protect, authorize("admin"));

router.route("/")
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route("/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;