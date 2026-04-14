import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
});

export const sendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Gym App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP for Reset Password",
      text: `Your OTP is ${otp}`
    });

    console.log("EMAIL SENT:", info.response);

  } catch (err) {
    console.log("MAIL ERROR FULL:", err);
    throw err;
  }
};