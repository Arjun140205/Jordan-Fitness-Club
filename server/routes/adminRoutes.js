import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

// Get dashboard stats
router.get("/dashboard", authMiddleware, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });

    // Sample data - replace with actual database queries
    const dashboardData = {
      stats: {
        totalUsers: totalUsers,
        pendingPayments: Math.floor(totalUsers * 0.15), // Example: 15% of users have pending payments
        activePlans: activeUsers,
        totalRevenue: `$${Math.floor(totalUsers * 100)}` // Example: $100 per user
      },
      users: await User.find()
        .select("name email role status createdAt plan")
        .sort({ createdAt: -1 })
        .limit(10)
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Error fetching admin dashboard data", error: error.message });
  }
});

export default router;
