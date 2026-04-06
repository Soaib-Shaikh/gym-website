import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // DB me save
    await Payment.create({
      user: req.user,
      orderId: order.id,
      amount,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔥 VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan
    } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign === razorpay_signature) {

      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "success",
        }
      );

      // 🔥 FINAL FIX
      await User.findByIdAndUpdate(req.user._id, {
        plan: plan
      });

      res.json({ success: true });

    } else {
      res.status(400).json({ success: false });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PAYMENTS
export const getPayments = async (req, res) => {
  const payments = await Payment.find().populate("user", "name email");
  res.json(payments);
};