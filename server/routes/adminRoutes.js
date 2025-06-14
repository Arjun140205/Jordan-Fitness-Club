import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Admin dashboard stats and user list
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const totalUsers = users.length;
    const pendingPayments = users.length; // Mocked: assuming all pending
    const activePlans = 0; // Replace with actual logic
    const totalRevenue = "₹0"; // Replace with actual logic

    const formattedUsers = users.map(user => {
      const joinDate = new Date(user.createdAt);
      const planEndDate = new Date(joinDate);
      planEndDate.setDate(planEndDate.getDate() + 30);

      return {
        name: user.name,
        email: user.email,
        phone: user.phone || "Not Provided",
        plan: "1-Month Trial Plan",
        status: "Pending", // Replace with actual fee status later
        joinDate: joinDate.toISOString().split('T')[0],
        planEndDate: planEndDate.toISOString().split('T')[0],
      };
    });

    res.json({
      stats: {
        totalUsers,
        pendingPayments,
        activePlans,
        totalRevenue,
      },
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard", error: error.message });
  }
});

// @route   POST /api/admin/notify
// @desc    Send pending fee reminder to all users via email and SMS
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();

    // Setup nodemailer transporter (adjust as per your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use host/port/auth
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const sendResults = [];

    for (const user of users) {
      const emailMessage = {
        from: `"Jordan Fitness Club" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Pending Fee Reminder",
        html: `
          <p>Dear ${user.name},</p>
          <p>${req.body.message || "This is a gentle reminder that your gym membership fee is pending."}</p>
          <p>Please clear it to continue enjoying our services.</p>
          <p>Thank you! <br/> Jordan Fitness Club</p>
        `,
      };

      // Send email
      const emailResult = await transporter.sendMail(emailMessage);

      // [Optional] Send SMS via your SMS provider's API here using `user.phone`

      sendResults.push({
        name: user.name,
        email: user.email,
        emailStatus: emailResult.accepted ? "Sent" : "Failed",
      });
    }

    res.json({
      message: "Notifications sent",
      results: sendResults,
    });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).json({ message: "Failed to send notifications", error: error.message });
  }
});

export default router;