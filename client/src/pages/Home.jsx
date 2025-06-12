import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gymBg from "../assets/gym.jpg";
import { ChevronRight, Dumbbell } from "lucide-react";

const Home = () => {
  return (
    <>
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${gymBg})` }}
      />
      <div className="relative z-10 min-h-screen">
        <div className="layout-container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block p-3 bg-accent-primary/10 rounded-2xl mb-6"
            >
              <Dumbbell className="w-8 h-8 text-accent-primary animate-float" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 gradient-text"
            >
              Transform Your Fitness Journey Today
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Join Jordan Fitness Club and experience state-of-the-art facilities,
              expert trainers, and a supportive community dedicated to your success.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register" className="liquid-button group">
                Get Started
                <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="glassmorphism px-6 py-3 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors">
                Member Login
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.2 }}
                className="glassmorphism p-6 rounded-2xl card-hover-effect"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-accent-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

const features = [
  {
    title: "Modern Equipment",
    description: "State-of-the-art fitness equipment for optimal workouts",
    icon: <Dumbbell className="w-6 h-6 text-accent-primary" />,
  },
  {
    title: "Expert Trainers",
    description: "Professional trainers to guide your fitness journey",
    icon: <Dumbbell className="w-6 h-6 text-accent-primary" />,
  },
  {
    title: "Flexible Plans",
    description: "Choose from various membership plans that suit your needs",
    icon: <Dumbbell className="w-6 h-6 text-accent-primary" />,
  },
];

export default Home;
