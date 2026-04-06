import Trainer from "../models/trainerModel.js";


// ADD TRAINER
export const addTrainer = async (req, res) => {
  const trainer = await Trainer.create(req.body);
  res.json(trainer);
};

// GET ALL TRAINERS
export const getTrainers = async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
};

// DELETE TRAINER
export const deleteTrainer = async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: "Trainer removed" });
};