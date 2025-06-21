import { motion } from "framer-motion";
import { RiUserStarFill, RiHeartFill, RiTeamFill, RiHeartPulseFill, RiTimeFill, RiArrowRightLine, 
         RiMedalFill, RiHealthBookFill, RiMoneyDollarCircleFill, RiRestTimeFill } from 'react-icons/ri';

const Careers = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Join Our Team</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Be part of a dynamic team that's passionate about fitness and helping others achieve their goals. 
            We're always looking for talented individuals to join our growing family.
          </p>
        </motion.div>

        {/* Why Join Us Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoinUs.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              >
                <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                  {reason.icon}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Employee Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                  {benefit.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {position.type} · {position.location}
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <RiArrowRightLine className="text-[var(--secondary-color)]" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[var(--secondary-color)] text-white rounded-lg hover:bg-[var(--secondary-color-dark)] transition-colors">
                      Apply Now <RiArrowRightLine />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No Openings Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Don't see the right position?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Send your resume to{" "}
            <a 
              href="mailto:careers@jordanfitnessclub.com" 
              className="text-[var(--secondary-color)]"
            >
              careers@jordanfitnessclub.com
            </a>
            {" "}and we'll keep you in mind for future opportunities.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const whyJoinUs = [
  {
    title: "Inspiring Mission",
    description: "Be part of a team dedicated to transforming lives through fitness and wellness.",
    icon: <RiHeartFill />
  },
  {
    title: "Career Growth",
    description: "Clear career paths and ongoing professional development opportunities.",
    icon: <RiUserStarFill />
  },
  {
    title: "Inclusive Culture",
    description: "A diverse and supportive workplace where everyone belongs.",
    icon: <RiTeamFill />
  },
  {
    title: "Work-Life Balance",
    description: "Flexible schedules and emphasis on personal wellbeing.",
    icon: <RiTimeFill />
  }
];

const benefits = [
  {
    title: "Competitive Pay",
    description: "Industry-leading compensation with performance bonuses and regular reviews.",
    icon: <RiMoneyDollarCircleFill />
  },
  {
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision coverage for you and your family.",
    icon: <RiHealthBookFill />
  },
  {
    title: "Growth Opportunities",
    description: "Continuous learning and development programs to advance your career in the fitness industry.",
    icon: <RiHeartPulseFill />
  },
  {
    title: "Wellness Program",
    description: "Free gym membership, fitness classes, and wellness programs for employees.",
    icon: <RiMedalFill />
  },
  {
    title: "Work-Life Balance",
    description: "Flexible schedules, paid time off, and parental leave benefits.",
    icon: <RiRestTimeFill />
  },
  {
    title: "Team Culture",
    description: "Regular team events, recognition programs, and a supportive work environment.",
    icon: <RiTeamFill />
  }
];

const openPositions = [
  {
    title: "Senior Personal Trainer",
    type: "Full-Time",
    location: "Multiple Locations",
    requirements: [
      "5+ years of personal training experience",
      "Current certification from NASM, ACE, or equivalent",
      "Proven track record of client retention",
      "Strong communication and motivation skills"
    ]
  },
  {
    title: "Fitness Manager",
    type: "Full-Time",
    location: "Downtown",
    requirements: [
      "3+ years of management experience in fitness",
      "Bachelor's degree in related field",
      "Strong leadership and organizational skills",
      "Experience with scheduling and budgeting"
    ]
  },
  {
    title: "Group Fitness Instructor",
    type: "Part-Time",
    location: "Multiple Locations",
    requirements: [
      "Group fitness certification required",
      "Experience teaching various class formats",
      "High energy and motivational teaching style",
      "Flexible availability including weekends"
    ]
  },
  {
    title: "Membership Coordinator",
    type: "Full-Time",
    location: "Main Branch",
    requirements: [
      "2+ years of sales or customer service experience",
      "Strong interpersonal and communication skills",
      "Experience with CRM software",
      "Goal-oriented with proven sales track record"
    ]
  },
  {
    title: "Nutrition Specialist",
    type: "Contract",
    location: "Remote/Hybrid",
    requirements: [
      "Registered Dietitian certification",
      "Experience in sports nutrition",
      "Ability to create personalized meal plans",
      "Strong client consultation skills"
    ]
  }
];

export default Careers;
