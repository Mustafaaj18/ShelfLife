import express from "express";
import healthCtrl from "../controllers/healthController.js";

const router = express.Router();

router.get("/", healthCtrl.check);

export default router;