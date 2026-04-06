import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";
import { uploadImage } from "../contollers/uploadController.js";


const router = express.Router();

// 🔥 IMAGE UPLOAD
router.post("/", protect, upload.single("image"), uploadImage);

export default router;