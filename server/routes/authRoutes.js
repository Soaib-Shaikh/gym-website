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

// 🔥 Google login
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent"
  })
);

// 🔥 Google callback (FINAL FIX)
router.get("/google/callback", (req, res, next) => {

  passport.authenticate("google", { session: false }, (err, user, info) => {

    if (err) {
      console.log("AUTH ERROR FULL:", err); // 🔥 FULL ERROR
      return res.status(500).send("Google Auth Error: " + err.message);
    }

    if (!user) {
      console.log("NO USER:", info);
      return res.status(400).send("User not found");
    }

    try {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.send(`
  <script>
    window.opener.postMessage({
      token: "${token}",
      user: {
        name: "${user.name}",
        email: "${user.email}"
      }
    }, "*");
    window.close();
  </script>
`);

    } catch (error) {
      console.log("JWT ERROR:", error);
      res.status(500).send("Token Error");
    }

  })(req, res, next);

});

export default router;