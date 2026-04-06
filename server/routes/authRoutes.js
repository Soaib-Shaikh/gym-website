import express from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  getProfile
} from "../contollers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 PROFILE ROUTES
router.get("/profile", protect, getProfile);  
router.put("/profile", protect, upload.single("image"), updateProfile);

export default router;