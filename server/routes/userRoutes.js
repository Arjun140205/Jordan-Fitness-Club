import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user dashboard data
router.get("/dashboard", authMiddleware, (req, res) => {
  console.log("Dashboard request received for user:", req.user); // Debug

  try {
    const currentDate = new Date();

    const planEndDate = new Date(req.user.createdAt || currentDate);
    planEndDate.setDate(planEndDate.getDate() + 30);

    const dashboardData = {
      name: req.user.name || "User",
      email: req.user.email || "Not Provided",
      phone: req.user.phone || "Not Provided",
      currentPlan: "1-Month Trial Plan",
      planEndDate: planEndDate.toISOString(),
      feeStatus: "Pending",
      membershipId: req.user._id,
      joinedOn: req.user.createdAt,
      upcomingPlans: [
        "One Month Flex Plan",
        "HIIT + Diet Combo",
        "Annual Discount Package",
      ],
      stats: {
        daysActive: Math.floor(
          (currentDate - new Date(req.user.createdAt)) / (1000 * 60 * 60 * 24)
        ),
        workoutsCompleted: 0,
        averageRating: 4.5,
      },
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
});

export default router;