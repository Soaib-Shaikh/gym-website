import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { deleteUser, getUsers } from "../contollers/adminController.js";


const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);
router.delete("/user/:id", protect, adminOnly, deleteUser);

export default router;