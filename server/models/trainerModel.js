import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  image: String
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;