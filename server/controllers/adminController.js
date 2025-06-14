// controllers/adminController.js
import NotificationLog from "../models/NotificationLog.js";

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