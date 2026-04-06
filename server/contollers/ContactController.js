import { transporter } from "../configs/mail.js";
import Contact from "../models/contactModel.js";

export const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }

    // 🔥 1. SAVE TO DATABASE
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save(); // ✅ THIS WAS MISSING

    // 🔥 2. SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    res.status(201).json({
      message: "Message saved & sent successfully ✅",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContacts = async (req, res) => { 
  const contacts = await Contact.find(); 
  res.json(contacts); 
};