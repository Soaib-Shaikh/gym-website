import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fitness_users",
  },
});

export const upload = multer({ storage });