import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in months
  price: { type: Number, required: true },
  features: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model("Plan", planSchema); 