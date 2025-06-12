import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format, differenceInDays } from "date-fns";
import { 
  Dumbbell, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Trophy
} from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Calculate days remaining in current plan
  const getDaysRemaining = () => {
    if (!data?.planEndDate) return 0;
    return Math.max(0, differenceInDays(new Date(data.planEndDate), new Date()));
  };

  const daysRemaining = getDaysRemaining();
  const progressPercentage = (daysRemaining / 30) * 100; // Assuming 30-day plan

  if (loading) return <Skeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Trophy className="w-8 h-8 text-yellow-500" />
        Welcome back, {data.name}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Plan Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Dumbbell className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg">Current Plan</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-4">{data.currentPlan}</p>
          <div className="w-24 h-24 mx-auto">
            <CircularProgressbar
              value={progressPercentage}
              text={`${daysRemaining}d`}
              styles={buildStyles({
                pathColor: '#3b82f6',
                textColor: '#3b82f6',
                trailColor: '#dbeafe',
              })}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Plan expires on {format(new Date(data.planEndDate), 'MMM dd, yyyy')}
          </p>
        </motion.div>

        {/* Fee Status Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">Fee Status</h3>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {data.feeStatus === "Paid" ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Timer className="w-6 h-6 text-orange-500 animate-pulse" />
            )}
            <span className={`text-xl font-semibold ${
              data.feeStatus === "Paid" ? "text-green-600" : "text-orange-600"
            }`}>
              {data.feeStatus}
            </span>
          </div>
          {data.feeStatus === "Pending" && (
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="text-sm text-orange-700">Payment due for this month</p>
              </div>
              <button className="mt-3 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Pay Now
              </button>
            </div>
          )}
        </motion.div>

        {/* Upcoming Plans Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">Upcoming Plans</h3>
          </div>
          <ul className="space-y-3">
            {data.upcomingPlans.map((plan, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                {plan}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* QR Code Section */}
      {data.feeStatus === "Pending" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 text-center max-w-md mx-auto"
        >
          <h3 className="font-semibold text-xl mb-6">Scan to Pay</h3>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20"></div>
            <QRCodeSVG
              value={data.qrCodeData || "https://payment-link"}
              size={200}
              className="mx-auto bg-white p-2 rounded-2xl relative z-10"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Scan using any UPI app to complete your payment
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
