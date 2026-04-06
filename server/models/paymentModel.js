import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderId: String,
  paymentId: String,
  amount: Number,
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

 
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;