import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { addTrainer, deleteTrainer, getTrainers } from "../contollers/trainerController.js";


const router = express.Router();

router.post("/", protect, adminOnly, addTrainer);
router.get("/", getTrainers);
router.delete("/:id", protect, adminOnly, deleteTrainer);

export default router;