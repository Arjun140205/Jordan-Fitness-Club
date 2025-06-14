// models/NotificationLog.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ["Success", "Failed"],
    default: "Success"
  },
  type: {
    type: String,
    enum: ["Email", "SMS", "Both"],
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  fallbackUsed: Boolean,
});

export default mongoose.model("NotificationLog", logSchema);