import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {data.name}</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Current Plan:</h3>
        <p className="text-blue-600">{data.currentPlan}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Fee Status:</h3>
        <p className={data.feeStatus === "Pending" ? "text-red-600" : "text-green-600"}>
          {data.feeStatus}
        </p>
      </div>

      {data.feeStatus === "Pending" && (
        <div className="mb-6 text-center">
          <h3 className="font-semibold text-lg mb-2">Pay Now via QR Code:</h3>
          <img
            src={data.qrCodeImage}
            alt="QR Code"
            className="mx-auto w-48 h-48 border"
          />
          <p className="text-sm mt-2 text-gray-600">Scan using UPI app to pay</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Upcoming Plans:</h3>
        <ul className="list-disc pl-5 text-gray-800">
          {data.upcomingPlans.map((plan, idx) => (
            <li key={idx}>{plan}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
