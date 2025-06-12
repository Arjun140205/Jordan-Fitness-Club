import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Sample data - can be later replaced with DB values
router.get("/dashboard", protect, (req, res) => {
  res.json({
    name: "John Doe",
    email: req.user.email,
    currentPlan: "6-Month Muscle Gain Plan",
    feeStatus: "Pending",
    upcomingPlans: [
      "One Month Flex Plan",
      "HIIT + Diet Combo",
      "Annual Discount Package",
    ],
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?data=upi://pay&size=200x200"
  });
});

export default router;
