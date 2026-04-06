import express from "express";

import { createOrder, getPayments, verifyPayment } from "../contollers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// PROTECTED
router.post("/create-order", protect, createOrder);

// VERIFY
router.post("/verify", protect, verifyPayment);

router.get("/", protect, adminOnly, getPayments);

export default router;