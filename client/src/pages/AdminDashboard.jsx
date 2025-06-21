import { useState, useEffect, Fragment } from "react";
import { Tab, Dialog, Transition } from "@headlessui/react";
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
  Search,
  Download
} from "lucide-react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import { endpoints } from "../constants/config";
import Skeleton from "../components/Skeleton";
import NotificationLogs from "../components/NotificationLogs";
import PageTransition from "../components/PageTransition";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifying, setNotifying] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      pendingPayments: 0,
      activePlans: 0,
      totalRevenue: "$0",
      premiumUsers: 0
    },
    users: [],
    notifications: []
  });

  // Define tabs
  const tabs = ["Users", "Notifications"];

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

      await axios.post(
        endpoints.admin.notify,
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
      const response = await axios.post(endpoints.admin.notifyPayments, {}, {
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

  const sendNotifications = async () => {
    setNotifyLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${endpoints.admin.notify}`,
        { type: "Both" }, // always sending both email & sms
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Notifications sent!");
      console.log("Notify result:", res.data);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send notifications");
    } finally {
      setNotifyLoading(false);
    }
  };

  const handleNotifyAllUsers = async () => {
    if (!notificationMessage.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${endpoints.admin.notify}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: notificationMessage }),
      });
      
      if (!response.ok) throw new Error("Failed to send notification");
      
      setNotificationMessage("");
      setIsNotifyModalOpen(false);
      // Refresh notification logs
      fetchNotificationLogs();
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsLoading(false);
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
    px-3 md:px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2
    ${color} text-white shadow-lg
    transform transition-all duration-200
    hover:scale-[1.02] active:scale-[0.98]
    hover:shadow-xl text-sm md:text-base
  `;

  if (loading) {
    return (
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 animate-pulse" />
            ))}
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50">
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-[2000px] mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-6 text-center">
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
      </div>
    );
  }

  // Payment Reminder Confirmation Modal
  const PaymentReminderModal = (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Confirm Notification
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to send payment reminders to all unpaid users via email and SMS?
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 disabled:opacity-50"
                    onClick={sendNotifications}
                    disabled={notifyLoading}
                  >
                    {notifyLoading ? "Sending..." : "Confirm & Send"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <>
      <PageTransition>
        <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 lg:px-8">
          <div className="max-w-[2000px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white"
            >
              Admin Dashboard
            </motion.h1>

            <Tab.Group>
              <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-8">
                {[
                  { name: "Users", icon: Users, fullName: "Manage Users" },
                  { name: "Payments", icon: CreditCard, fullName: "View Payments" },
                  { name: "SMS", icon: MessageSquare, fullName: "Send SMS" },
                  { name: "Plans", icon: Plus, fullName: "Add Plan" },
                  { name: "Logs", icon: ClipboardList, fullName: "Notification Logs" },
                ].map((tab, idx) => (
                  <Tab key={idx} className={({ selected }) => 
                    `flex-1 min-w-[120px] rounded-lg py-2 md:py-3 px-2 md:px-4 text-sm font-medium leading-5 
                     text-gray-700 flex items-center justify-center gap-2 whitespace-nowrap
                     ${selected ? "bg-white shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"}`
                  }>
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    <span className="hidden md:inline">{tab.fullName}</span>
                    <span className="md:hidden">{tab.name}</span>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {/* Users Tab */}
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                    <StatCard
                      title="Total Users"
                      value={stats.totalUsers}
                      icon={<Users className="w-6 h-6" />}
                      color="bg-blue-500"
                    />
                    <StatCard
                      title="Pending Payments"
                      value={stats.pendingPayments}
                      icon={<CreditCard className="w-6 h-6" />}
                      color="bg-orange-500"
                    />
                    <StatCard
                      title="Active Plans"
                      value={stats.activePlans}
                      icon={<ClipboardList className="w-6 h-6" />}
                      color="bg-green-500"
                    />
                    <StatCard
                      title="Total Revenue"
                      value={stats.totalRevenue || "$0"}
                      icon={<CreditCard className="w-6 h-6" />}
                      color="bg-purple-500"
                    />
                  </div>

                  {/* User Management Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                      User Management
                    </h2>
                    <div className="space-y-4">
                      <button
                        onClick={() => setIsNotifyModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors mr-4"
                      >
                        Send Notification to All Users
                      </button>
                      <button
                        className={getButtonStyles("bg-orange-600 hover:bg-orange-700")}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="hidden sm:inline">Send Payment Reminder</span>
                        <span className="sm:hidden">Payment Reminder</span>
                      </button>
                    </div>
                  </div>

                  {/* User Table */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <h3 className="text-xl font-semibold">User Management</h3>
                      <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                        <UserPlus className="w-5 h-5" />
                        <span className="hidden sm:inline">Add New User</span>
                        <span className="sm:hidden">Add User</span>
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <DataTable data={users} columns={columns} searchField="name" />
                    </div>
                  </div>
                </Tab.Panel>

                {/* Payments Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Payment Management</h2>
                    <div className="space-y-6">
                      {/* Payment Statistics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
                          <p className="text-2xl font-bold text-green-600">{stats.totalRevenue || "$0"}</p>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Pending Payments</h3>
                          <p className="text-2xl font-bold text-orange-600">{stats.pendingPayments || 0}</p>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2">Active Plans</h3>
                          <p className="text-2xl font-bold text-blue-600">{stats.activePlans || 0}</p>
                        </div>
                      </div>
                      
                      {/* Payment Actions */}
                      <div className="flex flex-wrap gap-4">
                        <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                          <CreditCard className="w-5 h-5" />
                          View All Transactions
                        </button>
                        <button className={getButtonStyles("bg-green-600 hover:bg-green-700")}>
                          <Plus className="w-5 h-5" />
                          Record Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* SMS Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Send SMS Notifications</h2>
                    <div className="space-y-6">
                      <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Custom Message</h3>
                        <div className="space-y-4">
                          <textarea
                            value={smsMessage}
                            onChange={(e) => setSmsMessage(e.target.value)}
                            className="w-full h-32 px-4 py-2 rounded-lg bg-white dark:bg-gray-600 border
                                     border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 
                                     focus:ring-blue-500 dark:text-white"
                            placeholder="Type your message here..."
                          />
                          <button
                            onClick={sendNotification}
                            disabled={isSending}
                            className={getButtonStyles("bg-blue-600 hover:bg-blue-700") + 
                              (isSending ? " opacity-50 cursor-not-allowed" : "")}
                          >
                            <Send className="w-5 h-5" />
                            {isSending ? "Sending..." : "Send SMS"}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className={getButtonStyles("bg-orange-600 hover:bg-orange-700")}
                          >
                            <MessageSquare className="w-5 h-5" />
                            Send Payment Reminders
                          </button>
                          <button className={getButtonStyles("bg-purple-600 hover:bg-purple-700")}>
                            <MessageSquare className="w-5 h-5" />
                            Send Attendance Reminders
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Plans Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Manage Plans</h2>
                    
                    {/* Add New Plan Form */}
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-medium mb-4">Add New Plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Plan Name"
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-600 border
                                   border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Duration (months)"
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-600 border
                                   border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-600 border
                                   border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-600 border
                                   border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700") + " mt-4"}>
                        <Plus className="w-5 h-5" />
                        Add Plan
                      </button>
                    </div>

                    {/* Existing Plans */}
                    <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Current Plans</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Example Plan Cards */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold mb-2">Basic Plan</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Duration: 1 Month</p>
                          <p className="text-lg font-bold text-blue-600">$29.99</p>
                          <div className="flex gap-2 mt-4">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Notification Logs Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Notification History</h2>
                      <button className={getButtonStyles("bg-blue-600 hover:bg-blue-700")}>
                        <Download className="w-5 h-5" />
                        Export Logs
                      </button>
                    </div>
                    <NotificationLogs />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {/* Notification Modal */}
            <Transition appear show={isNotifyModalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsNotifyModalOpen(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25 dark:bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Send Notification to All Users
                        </Dialog.Title>
                        <div className="mt-4">
                          <textarea
                            className="w-full px-3 py-2 text-gray-700 dark:text-white border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="4"
                            placeholder="Enter your message here..."
                            value={notificationMessage}
                            onChange={(e) => setNotificationMessage(e.target.value)}
                          />
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none"
                            onClick={() => setIsNotifyModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${
                              isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                            onClick={handleNotifyAllUsers}
                            disabled={isLoading}
                          >
                            {isLoading ? "Sending..." : "Send Notification"}
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* Payment Reminder Modal */}
            {PaymentReminderModal}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default AdminDashboard;