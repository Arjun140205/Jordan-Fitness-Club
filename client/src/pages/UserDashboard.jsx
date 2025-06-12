import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format, differenceInDays } from "date-fns";
import userGymBg from "../assets/usergym.jpg";
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

// Safe date handling functions
const parseSafeDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

const calculateDaysRemaining = (endDateStr) => {
  const endDate = parseSafeDate(endDateStr);
  if (!endDate) return 0;
  
  const today = new Date();
  const diff = differenceInDays(endDate, today);
  return Math.max(0, diff);
};

const formatSafeDate = (dateStr) => {
  const date = parseSafeDate(dateStr);
  return date ? format(date, 'MMM dd, yyyy') : 'Not available';
};

const UserDashboard = () => {
  console.log("UserDashboard rendering"); // Debug render
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    console.log("Fetching dashboard data..."); // Debug fetch start
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      console.log("Token:", token ? "exists" : "missing"); // Debug token

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Making API request..."); // Debug API call
      const res = await axios.get("http://localhost:5001/api/user/dashboard", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("API response:", res.data); // Debug response
      if (res.data) {
        setData(res.data);
      } else {
        throw new Error("No data received from server");
      }
    } catch (err) {
      console.error("Dashboard error details:", {
        message: err.message,
        response: err.response,
        status: err.response?.status
      });
      setError(err.message);
      toast.error(err.response?.data?.message || err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const daysRemaining = data ? calculateDaysRemaining(data.planEndDate) : 0;
  const progressPercentage = (daysRemaining / 30) * 100; // Assuming 30-day plan

  console.log("Current state:", { loading, data, error }); // Debug state

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="glassmorphism border-red-500/50 p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">Error loading dashboard: {error}</p>
          </div>
          <button 
            onClick={fetchDashboard} 
            className="liquid-button mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="glassmorphism border-yellow-500/50 p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
            <p className="text-yellow-700">No dashboard data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${userGymBg})` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8 flex items-center gap-2 gradient-text"
        >
          <Trophy className="w-8 h-8 text-yellow-500 animate-float" />
          Welcome back, {data.name}!
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="glassmorphism p-6 rounded-2xl card-hover-effect"
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
              Plan expires on {
                data.planEndDate ? 
                format(new Date(data.planEndDate), 'MMM dd, yyyy') :
                'Not available'
              }
            </p>
          </motion.div>

          {/* Fee Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="glassmorphism p-6 rounded-2xl card-hover-effect"
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
              <button className="liquid-button w-full">
                Pay Now
              </button>
            )}
          </motion.div>

          {/* Upcoming Plans Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="glassmorphism p-6 rounded-2xl card-hover-effect"
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
            transition={{ delay: 0.6 }}
            className="glassmorphism p-8 rounded-2xl text-center max-w-md mx-auto card-hover-effect"
          >
            <h3 className="font-semibold text-xl mb-6 gradient-text">Scan to Pay</h3>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent-primary rounded-2xl blur-xl opacity-20 animate-glow"></div>
              <QRCodeSVG
                value={data.qrCodeData || "https://payment-link"}
                size={200}
                className="mx-auto bg-white p-2 rounded-2xl relative z-10"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Scan using any UPI app to complete your payment
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default UserDashboard;
