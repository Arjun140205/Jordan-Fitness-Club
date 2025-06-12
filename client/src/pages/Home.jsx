import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import patternBg from "../assets/pattern.svg";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div 
      className="min-h-[calc(100vh-6rem)] -mt-24 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${patternBg})`,
        backgroundRepeat: "repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm" />

      {/* Floating Emojis */}
      <motion.div
        className="absolute text-6xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ top: "20%", left: "15%" }}
      >
        💪
      </motion.div>
      <motion.div
        className="absolute text-6xl"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        style={{ bottom: "20%", right: "15%" }}
      >
        🏋️‍♂️
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={itemVariants}
        >
          Welcome to Jordan Fitness Club
        </motion.h1>

        <motion.div
          className="relative inline-block mb-8"
          variants={itemVariants}
        >
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Transform Your Body, Transform Your Life
          </h2>
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg
                     hover:bg-blue-700 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-blue-500/25"
          >
            Join Now
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg
                     hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
          >
            Login to Track Progress
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center"
          variants={itemVariants}
        >
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-xl">
            <span className="text-3xl mb-4 block">🎯</span>
            <h3 className="font-semibold mb-2">Set Goals</h3>
            <p className="text-gray-600">Track your fitness journey</p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-xl">
            <span className="text-3xl mb-4 block">💳</span>
            <h3 className="font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-600">Manage memberships</p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-xl">
            <span className="text-3xl mb-4 block">📊</span>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your growth</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
