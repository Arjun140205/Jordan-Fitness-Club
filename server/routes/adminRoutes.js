import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getNotificationLogs,
  getDashboardData,
  sendPendingFeeNotifications,
  addUser,
  addPlan,
} from "../controllers/adminController.js";

const router = express.Router();

// Get admin dashboard data
router.get("/dashboard", authMiddleware, getDashboardData);

// Send notifications to users with pending fees
router.post("/notify", authMiddleware, sendPendingFeeNotifications);

// Add this new route for payment reminders
router.post("/notify-payments", authMiddleware, sendPendingFeeNotifications);

// Get notification logs
router.get("/notification-logs", authMiddleware, getNotificationLogs);

// Add new user
router.post("/add-user", authMiddleware, addUser);

// Add new plan
router.post("/add-plan", authMiddleware, addPlan);

export default router;