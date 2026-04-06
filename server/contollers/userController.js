import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// 🔐 REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully."
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔑 LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || null
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 👤 GET PROFILE (🔥 NEW - IMPORTANT)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✏️ UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let updateData = { ...req.body };

    // 🔥 IMAGE HANDLE
    if (req.file) {
      updateData.image = req.file.path; // cloudinary URL
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};