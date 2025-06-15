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
import NotificationLogs from "../components/NotificationLogs";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifying, setNotifying] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
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

  const sendNotification = async () => {
    if (!smsMessage.trim()) {
      toast.error("Please enter a message to send.");
      return;
    }

    try {
      setIsSending(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      const response = await axios.post(
        `${endpoints.admin.notify}`,
        { message: smsMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Notification sent successfully!");
      setSmsMessage(""); // Clear input on success
    } catch (err) {
      console.error("Notification error:", err);
      toast.error("Failed to send notification.");
    } finally {
      setIsSending(false);
    }
  };

  const sendPaymentReminders = async () => {
    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to send payment reminders to all users with pending payments?")) {
      return;
    }

    try {
      setNotifying(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${endpoints.admin.notifyPayments}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const { results } = response.data;
      toast.success(`Payment reminders sent to ${results.length} users with pending payments.`);
    } catch (err) {
      console.error("Payment reminder error:", err);
      toast.error("Failed to send payment reminders. " + err.message);
    } finally {
      setNotifying(false);
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
            : "bg-gradient-to-r from-[#fce51d]/10 to-[#fec62c]/10 text-[#fec62c]"
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-500" />
        <StatCard title="Pending Payments" value={stats.pendingPayments} icon={CreditCard} color="bg-gradient-to-r from-[#fce51d] to-[#fec62c]" />
        <StatCard title="Active Plans" value={stats.activePlans} icon={ClipboardList} color="bg-green-500" />
        <StatCard title="Total Revenue" value={stats.totalRevenue} icon={CreditCard} color="bg-purple-500" />
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-white/70 backdrop-blur-sm p-1 mb-8">
          {[
            { name: "Manage Users", icon: Users },
            { name: "View Payments", icon: CreditCard },
            { name: "Send SMS", icon: MessageSquare },
            { name: "Add Plan", icon: Plus },
            { name: "Notification Logs", icon: ClipboardList },
          ].map((tab, idx) => (
            <Tab key={idx} className={({ selected }) => `w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 text-gray-700 flex items-center justify-center gap-2 ${selected ? "bg-white shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"}`}>
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">User Management</h3>
                <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                  <UserPlus className="w-5 h-5" />
                  Add New User
                </button>
              </div>
              <DataTable data={users} columns={columns} searchField="name" />
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Payment History</h3>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Send SMS Notifications</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <textarea
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    className="w-full h-32 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border
                             border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                  />
                  <button
                    onClick={sendNotification}
                    disabled={isSending}
                    className={`${getButtonStyles("bg-blue-600 hover:bg-blue-700")} ${
                      isSending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSending ? "Sending..." : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Custom Notification
                      </>
                    )}
                  </button>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Quick Actions</h4>
                  <button
                    onClick={sendPaymentReminders}
                    disabled={notifying}
                    className={`${getButtonStyles("bg-gradient-to-r from-[#fce51d] to-[#fec62c] hover:opacity-90")} ${
                      notifying ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {notifying ? "Sending Reminders..." : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Send Payment Reminders
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Add New Plan</h3>
              <div className="space-y-4 max-w-md">
                <input type="text" placeholder="Plan Name" className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Duration (months)" className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Price" className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}> <Plus className="w-5 h-5" /> Add Plan </button>
              </div>
            </div>
          </Tab.Panel>

          {/* Notification Logs Panel */}
          <Tab.Panel>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-semibold mb-6">Notification Logs</h3>
              <NotificationLogs />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminDashboard;