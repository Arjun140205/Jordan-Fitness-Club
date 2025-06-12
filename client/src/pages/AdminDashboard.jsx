import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Users,
  CreditCard,
  MessageSquare,
  ClipboardList,
  UserPlus,
  Send,
  Plus,
  Trash2,
  Edit,
  Search
} from "lucide-react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import { endpoints } from "../constants/config";
import Skeleton from "../components/Skeleton";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      pendingPayments: 0,
      activePlans: 0,
      totalRevenue: "$0"
    },
    users: []
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${endpoints.admin.dashboard}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setDashboardData(response.data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message);
      toast.error("Failed to load dashboard data. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const { stats, users } = dashboardData;

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Plan",
      accessorKey: "plan",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs
          ${row.original.status === "Active" 
            ? "bg-green-100 text-green-800" 
            : "bg-orange-100 text-orange-800"
          }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Join Date",
      accessorKey: "joinDate",
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Edit size={16} />
          </button>
          <button className="p-1 text-red-600 hover:text-red-800">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Neumorphic button style
  const getButtonStyles = (color) => `
    px-4 py-2 rounded-xl font-medium flex items-center gap-2
    ${color} text-white shadow-lg
    transform transition-all duration-200
    hover:scale-[1.02] active:scale-[0.98]
    hover:shadow-xl
  `;

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 animate-pulse" />
          ))}
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h3 className="text-red-800 text-lg font-medium mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className={getButtonStyles("bg-red-600 hover:bg-red-700") + " mt-4 mx-auto"}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          icon={CreditCard}
          color="bg-orange-500"
        />
        <StatCard
          title="Active Plans"
          value={stats.activePlans}
          icon={ClipboardList}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={CreditCard}
          color="bg-purple-500"
        />
      </div>

      {/* Tabs Section */}
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-white/70 backdrop-blur-sm p-1 mb-8">
          {[
            { name: "Manage Users", icon: Users },
            { name: "View Payments", icon: CreditCard },
            { name: "Send SMS", icon: MessageSquare },
            { name: "Add Plan", icon: Plus },
          ].map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) => 
                `w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 text-gray-700
                flex items-center justify-center gap-2
                ${selected
                  ? "bg-white shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"}
                `
              }
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {/* Manage Users Panel */}
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">User Management</h3>
                <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                  <UserPlus className="w-5 h-5" />
                  Add New User
                </button>
              </div>
              {loading ? (
                <Skeleton count={5} />
              ) : error ? (
                <div className="text-red-500 text-center py-4">
                  {error}
                </div>
              ) : (
                <DataTable
                  data={users}
                  columns={columns}
                  searchField="name"
                />
              )}
            </div>
          </Tab.Panel>

          {/* View Payments Panel */}
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Payment History</h3>
              {/* Add payment history table here */}
            </div>
          </Tab.Panel>

          {/* Send SMS Panel */}
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Send SMS Notifications</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className={getButtonStyles("bg-orange-600 hover:bg-orange-700")}>
                    <MessageSquare className="w-5 h-5" />
                    Send Payment Reminder
                  </button>
                  <button className={getButtonStyles("bg-green-600 hover:bg-green-700")}>
                    <Send className="w-5 h-5" />
                    Send Plan Expiry Alert
                  </button>
                </div>
                <textarea
                  className="w-full h-32 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border
                           border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                />
              </div>
            </div>
          </Tab.Panel>

          {/* Add Plan Panel */}
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Add New Plan</h3>
              <div className="space-y-4 max-w-md">
                <input
                  type="text"
                  placeholder="Plan Name"
                  className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border
                           border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Duration (months)"
                  className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border
                           border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border
                           border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                  <Plus className="w-5 h-5" />
                  Add Plan
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminDashboard
