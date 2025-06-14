import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    feeStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
    currentPlan: {
      type: String,
      default: "Trial Plan",
    },
    planStartDate: {
      type: Date,
      default: Date.now,
    },
    planEndDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);