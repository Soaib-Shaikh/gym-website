import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./configs/db.js";
dotenv.config();
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());


app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/trainers", trainerRoutes);
app.use("/api/booking", bookingRoutes);

app.listen(PORT, (err) => {
    if(!err){
        console.log(`Server running on http://localhost:${PORT}`);
        db();
    }
})