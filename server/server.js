import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./configs/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import session from "express-session";
import passport from "passport";
import "./configs/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 DEBUG ENV (VERY IMPORTANT)
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "FOUND" : "NOT FOUND");
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await db();
});