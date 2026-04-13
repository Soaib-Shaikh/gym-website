import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
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

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("image"), updateProfile);

// 🔥 Google login (FIXED)
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
});

// 🔥 Google callback
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const user = req.user;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send(`
      <script>
        window.opener.postMessage({ token: "${token}" }, "*");
        window.close();
      </script>
    `);
  }
);

export default router;