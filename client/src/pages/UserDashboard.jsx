import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";
import { 
  Dumbbell, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Target
} from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import axios from "axios";

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded test data - replace with actual API call
  const mockData = {
    name: "John Doe",
    membershipType: "Premium Plan",
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    daysRemaining: 48,
    paymentStatus: "Pending",
    paymentDue: "$99.99",
    paymentDate: "2025-07-01",
    nextClass: "Yoga",
    nextClassTime: "Tomorrow, 9:00 AM",
    totalClasses: 24,
    attendedClasses: 20
  };

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateProgress = () => {
    if (!data) return 0;
    return Math.round((data.attendedClasses / data.totalClasses) * 100);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Get order from backend
    try {
      const token = localStorage.getItem("token");
      const amount = Number(data.paymentDue.replace(/[^0-9.]/g, "")) * 100; // in paise
      const orderRes = await axios.post(
        `${API_URL}/user/razorpay-order`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const order = orderRes.data.order;

      const options = {
        key: "rzp_test_YourTestKeyHere", // Replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "Jordan Fitness Club",
        description: "Membership Fee Payment",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment successful! Payment ID: " + response.razorpay_payment_id);
          // Call backend to verify and update payment status
          try {
            await axios.post(
              `${API_URL}/user/razorpay-verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Payment verified and status updated!");
          } catch (err) {
            toast.error("Payment verification failed: " + (err.response?.data?.message || err.message));
          }
        },
        prefill: {
          name: data.name,
          email: data.email || "user@email.com",
          contact: data.phone || "9999999999",
        },
        theme: {
          color: "#fbbf24",
        },
        modal: {
          ondismiss: function () {
            toast("Payment popup closed");
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Failed to initiate payment: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-[var(--max-width)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-[var(--max-width)] mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <AlertTriangle className="inline-block mr-2" />
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-[var(--primary-color)]">
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {data.name}!</h1>
          <p className="text-[var(--text-light)]">Here's your fitness journey overview</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Membership Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--primary-color-light)] p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 glossy-black rounded-lg bg-opacity-20">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{data.membershipType}</h3>
                <p className="text-[var(--text-light)]">Current Plan</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[var(--text-light)] mb-1">Start Date</p>
                <p className="text-white">{format(new Date(data.startDate), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-[var(--text-light)] mb-1">End Date</p>
                <p className="text-white">{format(new Date(data.endDate), 'MMM dd, yyyy')}</p>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20">
                  <Timer className="w-5 h-5 text-blue-500" />
                  <span className="text-white">{data.daysRemaining} days remaining</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--primary-color-light)] p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#fce51d]/20 to-[#fec62c]/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-[#fec62c]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Payment Status</h3>
                <p className="text-[var(--text-light)]">Next payment due</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[var(--text-light)] mb-1">Amount Due</p>
                <p className="text-2xl font-bold text-white">{data.paymentDue}</p>
              </div>
              <div>
                <p className="text-[var(--text-light)] mb-1">Due Date</p>
                <p className="text-white">{format(new Date(data.paymentDate), 'MMM dd, yyyy')}</p>
              </div>
              {data.paymentStatus === "Pending" && (
                <button className="w-full btn-primary py-2" onClick={handleRazorpayPayment}>Pay Now</button>
              )}
            </div>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--primary-color-light)] p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Progress</h3>
                <p className="text-[var(--text-light)]">Class attendance</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={calculateProgress()}
                  text={`${calculateProgress()}%`}
                  styles={buildStyles({
                    pathColor: '#22c55e',
                    textColor: '#ffffff',
                    trailColor: '#374151',
                  })}
                />
              </div>
              <div>
                <p className="text-[var(--text-light)] mb-2">Classes this month</p>
                <p className="text-2xl font-bold text-white">{data.attendedClasses}/{data.totalClasses}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Class Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[var(--primary-color-light)] p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Next Class</h3>
                <p className="text-[var(--text-light)]">Upcoming session</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[var(--text-light)] mb-1">Class Type</p>
                <p className="text-2xl font-bold text-white">{data.nextClass}</p>
              </div>
              <div>
                <p className="text-[var(--text-light)] mb-1">Schedule</p>
                <p className="text-white">{data.nextClassTime}</p>
              </div>
              <button className="w-full bg-purple-500/20 text-purple-400 py-2 rounded-lg hover:bg-purple-500/30 transition-colors">
                View Schedule
              </button>
            </div>
          </motion.div>
        </div>

        {/* QR Code Section (shown only if payment is pending) */}
        {data.paymentStatus === "Pending" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[var(--primary-color-light)] p-6 rounded-xl max-w-md mx-auto text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Scan to Pay</h3>
            <div className="bg-white p-4 rounded-xl inline-block mb-4">
              <QRCodeSVG
                value={`upi://pay?pa=your-upi-id&pn=Jordan-Fitness&am=${data.paymentDue.replace('$', '')}`}
                size={200}
              />
            </div>
            <p className="text-[var(--text-light)]">
              Scan with any UPI app to make the payment
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
