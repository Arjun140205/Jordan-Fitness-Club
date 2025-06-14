import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getNotificationLogs,
  getDashboardData,
  sendPendingFeeNotifications,
} from "../controllers/adminController.js";

const router = express.Router();

// Get admin dashboard data
router.get("/dashboard", authMiddleware, getDashboardData);

// Send notifications to users with pending fees
router.post("/notify", authMiddleware, sendPendingFeeNotifications);

// Get notification logs
router.get("/notification-logs", authMiddleware, getNotificationLogs);

export default router;