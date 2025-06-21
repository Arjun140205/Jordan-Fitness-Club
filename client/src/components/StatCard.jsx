import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => {
  // Helper function to get text color from background color
  const getTextColor = (bgColor) => {
    if (!bgColor) return 'text-blue-500';
    return bgColor.replace('bg-', 'text-');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50
                relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full 
                    ${color} opacity-10`} />
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} bg-opacity-20 rounded-xl`}>
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon && <icon.type {...icon.props} className={`w-6 h-6 ${getTextColor(color)}`} />
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
