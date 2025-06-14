// routes/adminRoutes.js (Replace /notify)
import NotificationLog from "../models/NotificationLog.js";
import twilio from "twilio";
import { getNotificationLogs } from "../controllers/adminController.js";
router.get("/logs", authMiddleware, getNotificationLogs);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/notify", authMiddleware, async (req, res) => {
  const { type = "Both" } = req.body; // Email, SMS, or Both

  try {
    const users = await User.find({ feeStatus: "Pending" });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const results = [];

    for (const user of users) {
      let emailStatus = "Skipped";
      let smsStatus = "Skipped";
      let fallbackUsed = false;

      // Format email message
      const dueDate = user.planEndDate
        ? new Date(user.planEndDate).toDateString()
        : "Unknown";

      const emailMessage = {
        from: `"Jordan Fitness Club" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "⏰ Gym Fee Reminder",
        html: `
          <p>Hi ${user.name},</p>
          <p>This is a kind reminder that your gym fee is pending.</p>
          <p><strong>Plan:</strong> ${user.currentPlan}</p>
          <p><strong>Due Date:</strong> ${dueDate}</p>
          <p>Please clear your dues to avoid membership suspension.</p>
          <p>Thanks,<br/>Jordan Fitness Club</p>
        `,
      };

      // Email
      if (type === "Email" || type === "Both") {
        try {
          const emailResult = await transporter.sendMail(emailMessage);
          emailStatus = emailResult.accepted ? "Sent" : "Failed";
        } catch (err) {
          emailStatus = "Failed";
        }
      }

      // SMS
      if ((type === "SMS" || type === "Both") && user.phone) {
        const smsBody = `Hi ${user.name}, your gym fee is pending for plan "${user.currentPlan}". Due: ${dueDate}. - Jordan Fitness Club`;

        try {
          // First try Fast2SMS
          const fast2smsRes = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
              message: smsBody,
              route: "v3",
              language: "english",
              numbers: user.phone,
              sender_id: "TXTIND"
            },
            {
              headers: {
                authorization: process.env.FAST2SMS_API_KEY,
              },
            }
          );
          smsStatus = fast2smsRes.data.return ? "Sent" : "Failed";
        } catch (fastErr) {
          // Fallback: Twilio
          try {
            await twilioClient.messages.create({
              body: smsBody,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: "+91" + user.phone,
            });
            smsStatus = "Sent (Twilio)";
            fallbackUsed = true;
          } catch (twilioErr) {
            smsStatus = "Failed";
          }
        }
      }

      // Log to DB
      await NotificationLog.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: (emailStatus === "Sent" || smsStatus.includes("Sent")) ? "Success" : "Failed",
        type,
        message: `Email: ${emailStatus}, SMS: ${smsStatus}`,
        fallbackUsed,
      });

      results.push({
        name: user.name,
        email: user.email,
        phone: user.phone,
        emailStatus,
        smsStatus,
        fallbackUsed,
      });
    }

    res.json({
      message: "Notifications processed",
      results,
    });
  } catch (error) {
    console.error("Notify Error:", error);
    res.status(500).json({ message: "Notification failed", error: error.message });
  }
});

router.get("/logs", authMiddleware, async (req, res) => {
  try {
    const logs = await NotificationLog.find()
      .sort({ createdAt: -1 })
      .limit(100); // most recent 100 logs

    res.json({ logs });
  } catch (error) {
    console.error("Log fetch error:", error);
    res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
});