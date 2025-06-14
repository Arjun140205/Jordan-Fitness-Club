import { motion } from "framer-motion";
import { RiUserStarFill, RiHeartFill, RiTeamFill } from "react-icons/ri";

const Careers = () => {
  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black text-white py-20 mb-12"
      >
        <div className="max-w-[var(--max-width)] mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Be part of a dynamic team dedicated to transforming lives through fitness.
            We're looking for passionate individuals who share our commitment to excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="max-w-[var(--max-width)] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6 rounded-lg bg-white shadow-lg"
            >
              {benefit.icon}
              <h3 className="text-xl font-bold my-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Current Openings */}
      <section className="max-w-[var(--max-width)] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
        <div className="grid grid-cols-1 gap-6">
          {openings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-[var(--secondary-color)] mb-4">{job.type}</p>
                  </div>
                  <span className="bg-[var(--secondary-color)] text-white px-4 py-1 rounded-full text-sm">
                    {job.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 text-gray-600 mb-6">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Process */}
      <section className="max-w-[var(--max-width)] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-[var(--secondary-color)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const benefits = [
  {
    title: "Competitive Benefits",
    description: "Comprehensive health insurance, retirement plans, and paid time off to support your wellbeing.",
    icon: <RiHeartFill className="text-4xl text-[var(--secondary-color)] mx-auto" />
  },
  {
    title: "Growth Opportunities",
    description: "Continuous learning through certifications, workshops, and career advancement paths.",
    icon: <RiUserStarFill className="text-4xl text-[var(--secondary-color)] mx-auto" />
  },
  {
    title: "Team Culture",
    description: "Join a supportive community of fitness enthusiasts who inspire and motivate each other.",
    icon: <RiTeamFill className="text-4xl text-[var(--secondary-color)] mx-auto" />
  }
];

const openings = [
  {
    title: "Personal Trainer",
    type: "Full-time",
    location: "On-site",
    description: "We're seeking certified personal trainers passionate about helping clients achieve their fitness goals.",
    requirements: [
      "Certified Personal Trainer certification (NASM, ACE, or equivalent)",
      "1+ years of personal training experience",
      "Strong communication and interpersonal skills",
      "CPR/AED certification"
    ]
  },
  {
    title: "Group Fitness Instructor",
    type: "Part-time",
    location: "On-site",
    description: "Lead engaging group fitness classes and motivate members to reach their potential.",
    requirements: [
      "Group fitness certification",
      "Experience teaching various class formats",
      "High energy and motivational teaching style",
      "Flexible availability including evenings and weekends"
    ]
  },
  {
    title: "Membership Consultant",
    type: "Full-time",
    location: "On-site",
    description: "Drive membership growth while providing exceptional customer service to prospects and members.",
    requirements: [
      "Sales experience in fitness or related industry",
      "Strong communication and networking skills",
      "Goal-oriented mindset",
      "Computer proficiency"
    ]
  }
];

const process = [
  {
    title: "Apply Online",
    description: "Submit your application and resume through our careers portal."
  },
  {
    title: "Initial Review",
    description: "Our hiring team will review your application within 5 business days."
  },
  {
    title: "Interview Process",
    description: "Selected candidates will be invited for interviews and practical assessments."
  },
  {
    title: "Welcome Aboard",
    description: "Successful candidates will receive offer letters and onboarding information."
  }
];

export default Careers;
