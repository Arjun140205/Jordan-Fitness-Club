import { motion } from "framer-motion";

const Community = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-container"
    >
      <h1 className="section-header">Our Community</h1>
      <p className="section-subheader">Coming Soon</p>
    </motion.div>
  );
};

export default Community;
