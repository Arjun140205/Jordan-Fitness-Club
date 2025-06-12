import { motion } from "framer-motion";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-container"
    >
      <h1 className="section-header">Our Services</h1>
      <p className="section-subheader">Coming Soon</p>
    </motion.div>
  );
};

export default Services;
