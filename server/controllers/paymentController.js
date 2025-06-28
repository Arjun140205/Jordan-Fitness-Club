import Razorpay from "razorpay";
import crypto from "crypto";
import NotificationLog from "../models/NotificationLog.js";
import User from "../models/User.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount), // amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create Razorpay order", error: err.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Mark user as paid
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { feeStatus: "Paid" });

    // Log payment
    await NotificationLog.create({
      userId,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      status: "Success",
      type: "Razorpay",
      message: `Payment successful. Payment ID: ${razorpay_payment_id}`,
    });

    res.json({ message: "Payment verified and status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to verify payment", error: err.message });
  }
}; 