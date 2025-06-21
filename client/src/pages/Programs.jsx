import { motion } from "framer-motion";
import { RiHeartPulseFill, RiRunFill, RiGroupFill, RiMentalHealthFill, RiTimeFill, RiArrowRightLine } from 'react-icons/ri';
import { Link } from "react-router-dom";

const Programs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Programs</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our diverse range of fitness programs designed to help you achieve your health and wellness goals.
            Each program is crafted by expert trainers to deliver optimal results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fitnessPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                {program.icon}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {program.description}
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 dark:text-gray-400">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <RiHeartPulseFill className="text-[var(--secondary-color)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                to="/register" 
                className="inline-flex items-center text-[var(--secondary-color)] hover:text-[var(--secondary-color-dark)] transition-colors"
              >
                Join Program <RiArrowRightLine className="ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Not sure which program is right for you?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Schedule a free consultation with one of our expert trainers to find the perfect program for your fitness journey.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] text-white rounded-lg transition-colors"
          >
            Book Consultation <RiArrowRightLine className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const fitnessPrograms = [
  {
    title: "Strength & Conditioning",
    description: "Build strength, increase endurance, and improve overall fitness through structured workouts.",
    icon: <RiHeartPulseFill />,
    features: [
      "Professional strength coaching",
      "Progressive overload training",
      "Performance tracking",
      "Nutrition guidance"
    ]
  },
  {
    title: "HIIT & Cardio",
    description: "High-intensity interval training designed to burn calories and boost metabolism.",
    icon: <RiRunFill />,
    features: [
      "Dynamic cardio sessions",
      "Circuit training",
      "Fat burning workouts",
      "Endurance building"
    ]
  },
  {
    title: "Group Fitness",
    description: "Energetic group classes that combine fun and effective workouts.",
    icon: <RiGroupFill />,
    features: [
      "Various class types",
      "Expert instructors",
      "Motivating atmosphere",
      "Social workout experience"
    ]
  },
  {
    title: "Mind & Body",
    description: "Holistic programs focusing on mental and physical wellness.",
    icon: <RiMentalHealthFill />,
    features: [
      "Yoga sessions",
      "Meditation classes",
      "Stress reduction",
      "Flexibility training"
    ]
  },
  {
    title: "Personal Training",
    description: "One-on-one sessions tailored to your specific goals and needs.",
    icon: <RiHeartPulseFill />,
    features: [
      "Customized workouts",
      "Goal setting",
      "Progress monitoring",
      "Regular assessments"
    ]
  },
  {
    title: "Express Workouts",
    description: "Time-efficient workouts designed for busy professionals.",
    icon: <RiTimeFill />,
    features: [
      "30-minute sessions",
      "High-efficiency training",
      "Flexible scheduling",
      "Quick results"
    ]
  }
];

export default Programs;
