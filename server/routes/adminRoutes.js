import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import axios from "axios";

const router = express.Router();

// @route   POST /api/admin/notify
// @desc    Notify unpaid users via email and SMS
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const unpaidUsers = await User.find({ feeStatus: "Pending" });

    if (unpaidUsers.length === 0) {
      return res.status(200).json({ message: "No unpaid users found." });
    }

    // 1. Setup Nodemailer (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const results = [];

    for (const user of unpaidUsers) {
      const name = user.name;
      const email = user.email;
      const phone = user.phone;
      const endDate = user.planEndDate
        ? new Date(user.planEndDate).toLocaleDateString("en-IN")
        : "N/A";

      // 2. Compose personalized email
      const mailOptions = {
        from: `"Jordan Fitness Club" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "⏳ Pending Gym Fee Reminder",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>We noticed that your gym membership fee is still <b>pending</b>.</p>
          <p>Your plan ends on: <strong>${endDate}</strong></p>
          <p>Please clear your dues to continue uninterrupted access to our facilities.</p>
          <p>Best regards,<br/>Jordan Fitness Club</p>
        `,
      };

      // 3. Send email
      let emailStatus = "Not Sent";
      try {
        await transporter.sendMail(mailOptions);
        emailStatus = "Sent";
      } catch (err) {
        console.error(`Email to ${email} failed:`, err.message);
        emailStatus = "Failed";
      }

      // 4. Send SMS via Fast2SMS API (FREE tier)
      let smsStatus = "Not Sent";
      try {
        await axios.post(
          "https://www.fast2sms.com/dev/bulkV2",
          {
            variables_values: `${name}|${endDate}`,
            route: "v3",
            numbers: phone,
            message: "Dear #VAR1#, your gym fee is pending. Plan ends on #VAR2#. - Jordan Fitness Club",
          },
          {
            headers: {
              Authorization: process.env.FAST2SMS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        smsStatus = "Sent";
      } catch (err) {
        console.error(`SMS to ${phone} failed:`, err.message);
        smsStatus = "Failed";
      }

      // Collect result
      results.push({
        name,
        email,
        phone,
        emailStatus,
        smsStatus,
      });
    }

    res.json({
      message: "Notifications sent to unpaid users",
      totalNotified: results.length,
      results,
    });
  } catch (error) {
    console.error("Notify error:", error);
    res.status(500).json({
      message: "Failed to send notifications",
      error: error.message,
    });
  }
});

export default router;