import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { createBooking, getAllBookings, getUserBookings, updateBooking } from "../contollers/bookingController.js";


const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getUserBookings);
router.get("/", protect, adminOnly, getAllBookings);
router.put("/:id", protect, adminOnly, updateBooking);

export default router;