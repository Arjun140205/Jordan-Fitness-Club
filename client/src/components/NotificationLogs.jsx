import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import { toast } from "react-hot-toast";
import { endpoints } from "../constants/config";

const NotificationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${endpoints.admin.logs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data.logs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <Skeleton count={5} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td className="px-4 py-2">{log.name}</td>
              <td className="px-4 py-2">{log.phone}</td>
              <td className="px-4 py-2">{log.email}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  log.status === "Success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {log.status}
                </span>
              </td>
              <td className="px-4 py-2">{log.message}</td>
              <td className="px-4 py-2">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationLogs;