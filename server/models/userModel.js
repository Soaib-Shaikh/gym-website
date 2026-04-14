import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },

    // 🔥 ROLE SYSTEM
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    // 🔥 PROFILE DATA
    image: String,
    gender: String,
    address: String,
    trainer: String,
    plan: String,

    height: Number,
    weight: Number,
    goal: String,
    targetWeight: Number

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;