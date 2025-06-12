import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-container"
    >
      <h1 className="section-header">About Us</h1>
      <p className="section-subheader">Coming Soon</p>
    </motion.div>
  );
};

export default About;
