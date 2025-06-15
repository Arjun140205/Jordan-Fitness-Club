import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 right-12 z-50"
    >
      <div className="logo-container rounded-full p-0.5 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-[2px]">
        <img 
          src={logo} 
          alt="Jordan Fitness Club Logo" 
          className="w-24 h-24 rounded-full object-cover filter contrast-110 brightness-105 hover:scale-102 transition-transform duration-300"
        />
      </div>
    </motion.div>
  );
};

export default Logo;
