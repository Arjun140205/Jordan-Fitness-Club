// controllers/adminController.js
import NotificationLog from "../models/NotificationLog.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import axios from "axios";
import Plan from "../models/Plan.js";
import bcrypt from "bcryptjs";

// Fetch recent 100 notification logs
export const getNotificationLogs = async (req, res) => {
  try {
    const logs = await NotificationLog.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
};

// Get admin dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const totalUsers = users.length;
    const pendingPayments = users.filter(u => u.feeStatus === "Pending").length;
    const activePlans = users.filter(u => u.feeStatus === "Paid").length;
    const totalRevenue = "₹0"; // Placeholder for now

    const formattedUsers = users.map(user => {
      const joinDate = new Date(user.createdAt);
      const planEndDate = user.planEndDate || new Date(joinDate.getTime() + 30 * 24 * 60 * 60 * 1000);

      return {
        name: user.name,
        email: user.email,
        phone: user.phone || "Not Provided",
        plan: user.currentPlan,
        status: user.feeStatus,
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
};

// Send notifications to users with pending fees
export const sendPendingFeeNotifications = async (req, res) => {
  try {
    const unpaidUsers = await User.find({ feeStatus: "Pending" });

    if (!unpaidUsers.length) {
      return res.status(200).json({ message: "No unpaid users to notify" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const smsApiKey = process.env.FAST2SMS_API_KEY;
    const sendResults = [];

    for (const user of unpaidUsers) {
      const dueDate = user.planEndDate
        ? new Date(user.planEndDate).toLocaleDateString()
        : "your due date";

      const emailMessage = {
        from: `"Jordan Fitness Club" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Pending Fee Reminder",
        html: `
          <p>Dear ${user.name},</p>
          <p>This is a reminder that your gym membership fee is pending. Please pay by <strong>${dueDate}</strong>.</p>
          <p>For assistance, contact us anytime.</p>
          <p>Thank you,<br/>Jordan Fitness Club</p>
        `,
      };

      // Send email
      const emailResult = await transporter.sendMail(emailMessage);

      // Send SMS via Fast2SMS
      const smsPayload = {
        route: "q",
        message: `Dear ${user.name}, your Jordan Fitness Club fee is pending. Please pay by ${dueDate}.`,
        language: "english",
        flash: 0,
        numbers: user.phone,
      };

      const smsHeaders = {
        headers: {
          authorization: smsApiKey,
          "Content-Type": "application/json",
        },
      };

      let smsStatus = "Not Sent";

      try {
        const smsResponse = await axios.post("https://www.fast2sms.com/dev/bulkV2", smsPayload, smsHeaders);
        smsStatus = smsResponse.data.return ? "Sent" : "Failed";
      } catch (smsError) {
        console.error("SMS error:", smsError.message);
        smsStatus = "Failed";
      }

      sendResults.push({
        name: user.name,
        email: user.email,
        phone: user.phone,
        emailStatus: emailResult.accepted ? "Sent" : "Failed",
        smsStatus,
      });

      // Log the notification
      await NotificationLog.create({
        userId: user._id,
        notificationType: "Fee Reminder",
        emailStatus: emailResult.accepted ? "Sent" : "Failed",
        smsStatus,
        message: `Fee reminder sent for due date ${dueDate}`,
      });
    }

    res.json({ message: "Notifications sent", results: sendResults });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).json({ message: "Failed to send notifications", error: error.message });
  }
};

// Add new user (admin only)
export const addUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashed, role: role || "user" });
    res.status(201).json({ message: "User added", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user", error: err.message });
  }
};

// Add new plan (admin only)
export const addPlan = async (req, res) => {
  try {
    const { name, duration, price, features } = req.body;
    if (!name || !duration || !price) {
      return res.status(400).json({ message: "Name, duration, and price are required" });
    }
    const plan = await Plan.create({ name, duration, price, features });
    res.status(201).json({ message: "Plan added", plan });
  } catch (err) {
    res.status(500).json({ message: "Failed to add plan", error: err.message });
  }
};