import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "user") {
      navigate("/user/dashboard");
    }
  }, []);

  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold mb-4">Welcome to Jordan Fitness Club 💪</h2>
      <p className="text-lg">Get fit. Stay strong. Track your fitness and payments here.</p>
    </div>
  );
};

export default Home;
