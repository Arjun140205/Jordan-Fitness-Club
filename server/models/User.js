import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  currentPlan: {
    type: String,
    default: "Basic",
  },
  planStartDate: {
    type: Date,
    default: Date.now,
  },
  planEndDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    },
  },
  feeStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;