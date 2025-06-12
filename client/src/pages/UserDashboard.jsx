import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";
import userGymBg from "../assets/usergym.jpg";
import { 
  Dumbbell, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Trophy,
  Activity,
  Users,
  TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import StatCard from "../components/StatCard";

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Hardcoded test data - replace with actual API call
  const mockData = {
    name: "John Doe",
    membershipStatus: 'active',
    daysRemaining: 45,
    membershipType: 'Premium',
    startDate: '2025-01-01',
    endDate: '2025-07-31',
    recentWorkouts: 12,
    totalWorkouts: 48,
    attendance: 85,
    upcomingClasses: [
      { id: 1, name: 'Yoga', date: '2025-06-14', time: '09:00 AM' },
      { id: 2, name: 'CrossFit', date: '2025-06-15', time: '10:30 AM' }
    ],
    currentPlan: "Premium Membership",
    feeStatus: "Paid",
    qrCodeData: "https://payment-link",
    upcomingPlans: [
      "Yoga Session - Tomorrow 9 AM",
      "Personal Training - Friday 4 PM",
      "Group Workout - Saturday 10 AM"
    ]
  };

  useEffect(() => {
    // Simulating API call with mock data
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Welcome back, {data.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your fitness journey and manage your membership
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {data.membershipStatus === 'active' && (
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 font-medium">
                Active Member
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Days Remaining"
            value={data.daysRemaining}
            icon={Timer}
            color="bg-blue-500"
          />
          <StatCard
            title="Recent Workouts"
            value={data.recentWorkouts}
            icon={Activity}
            color="bg-green-500"
          />
          <StatCard
            title="Total Workouts"
            value={data.totalWorkouts}
            icon={TrendingUp}
            color="bg-purple-500"
          />
          <StatCard
            title="Attendance Rate"
            value={`${data.attendance}%`}
            icon={Users}
            color="bg-orange-500"
          />
        </div>

        {/* Membership and Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Membership Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Membership Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Plan Type</p>
                  <p className="font-semibold">{data.membershipType}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Start Date</p>
                  <p className="font-semibold">{format(new Date(data.startDate), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">End Date</p>
                  <p className="font-semibold">{format(new Date(data.endDate), 'MMM dd, yyyy')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Classes
              </h3>
              <div className="divide-y dark:divide-gray-700">
                {data.upcomingClasses.map((class_) => (
                  <div key={class_.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{class_.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(class_.date), 'MMM dd')} at {class_.time}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Membership Progress
            </h3>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={data.attendance}
                  text={`${data.attendance}%`}
                  styles={buildStyles({
                    pathColor: `var(--primary-color)`,
                    textColor: `var(--primary-color)`,
                    trailColor: '#d1d5db',
                  })}
                />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Great Progress!</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  You've maintained {data.attendance}% attendance this month.
                  Keep up the good work!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
