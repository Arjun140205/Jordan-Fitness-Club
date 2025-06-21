import { motion } from "framer-motion";
import { RiTeamFill, RiHeartPulseFill, RiTimeFill, RiUserStarFill, RiMedalFill, RiGroupFill } from 'react-icons/ri';

const About = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Jordan Fitness Club</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Since 2020, Jordan Fitness Club has been at the forefront of fitness innovation, 
            helping thousands achieve their health and wellness goals.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <span className="text-[var(--secondary-color)] text-3xl mb-2 inline-block">
                {stat.icon}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aboutFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                {feature.icon}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To inspire and empower individuals to achieve their fitness goals through 
            personalized training, state-of-the-art facilities, and a supportive community 
            that celebrates every success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be the leading fitness destination that transforms lives through innovative 
                training programs and unwavering commitment to member success.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Values</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Excellence in service delivery</li>
                <li>Integrity in all interactions</li>
                <li>Innovation in fitness solutions</li>
                <li>Community-focused approach</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                  <RiMedalFill />
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {award.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {award.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const statistics = [
  {
    value: "5,000+",
    label: "Active Members",
    icon: <RiGroupFill />
  },
  {
    value: "50+",
    label: "Expert Trainers",
    icon: <RiUserStarFill />
  },
  {
    value: "100+",
    label: "Weekly Classes",
    icon: <RiHeartPulseFill />
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <RiMedalFill />
  }
];

const aboutFeatures = [
  {
    title: "Expert Team",
    description: "Our certified trainers and staff are dedicated to providing professional guidance and support throughout your fitness journey.",
    icon: <RiTeamFill />
  },
  {
    title: "Proven Results",
    description: "With thousands of success stories, our programs are designed to deliver real, sustainable results for our members.",
    icon: <RiHeartPulseFill />
  },
  {
    title: "Flexible Hours",
    description: "Open 24/7 to accommodate your busy schedule, because we believe fitness should be accessible at any time.",
    icon: <RiTimeFill />
  }
];

const awards = [
  {
    title: "Best Fitness Club 2024",
    year: "City Fitness Awards"
  },
  {
    title: "Excellence in Member Service",
    year: "Fitness Industry Association 2024"
  },
  {
    title: "Community Impact Award",
    year: "Local Business Excellence 2025"
  }
];

export default About;
