import express from "express";
import { getContacts, sendContact } from "../contollers/ContactController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/send", sendContact)
router.get("/", protect, adminOnly, getContacts);

export default router;