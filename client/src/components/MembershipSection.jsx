import { motion } from "framer-motion";
import { RiCheckboxCircleLine, RiArrowRightLine } from 'react-icons/ri';
import { Link } from "react-router-dom";

const MembershipSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">MEMBERSHIP THAT FITS YOU</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join Jordan Fitness Club today and experience the perfect blend of premium equipment, expert guidance, and a motivating atmosphere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-[var(--secondary-color)] transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <RiCheckboxCircleLine className="text-[var(--secondary-color)] text-xl mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/register" 
                className="w-full inline-block text-center py-4 px-6 rounded-xl bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] transition-colors font-semibold"
              >
                Get Started <RiArrowRightLine className="inline ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl text-[var(--secondary-color)] mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const membershipPlans = [
  {
    name: "BASIC PLAN",
    description: "Perfect for beginners",
    price: "29.99",
    features: [
      "Access to gym floor",
      "Basic equipment usage",
      "Locker room access",
      "Free fitness assessment",
      "Standard gym hours access"
    ]
  },
  {
    name: "PREMIUM PLAN",
    description: "Most Popular Choice",
    price: "49.99",
    features: [
      "Everything in Basic Plan",
      "Group fitness classes",
      "Personal training session (1x/month)",
      "Nutrition consultation",
      "Extended gym hours access"
    ]
  },
  {
    name: "ELITE PLAN",
    description: "Ultimate Fitness Experience",
    price: "79.99",
    features: [
      "Everything in Premium Plan",
      "Unlimited fitness classes",
      "Personal training sessions (2x/month)",
      "Recovery zone access",
      "Guest passes (2/month)"
    ]
  }
];

const benefits = [
  {
    title: "STATE OF THE ART EQUIPMENT",
    description: "Access premium fitness equipment from world-renowned brands",
    icon: "🏋️‍♂️"
  },
  {
    title: "EXPERT TRAINERS",
    description: "Work with certified professionals who are passionate about your success",
    icon: "👨‍🏫"
  },
  {
    title: "FLEXIBLE MEMBERSHIPS",
    description: "Choose plans that adapt to your schedule and fitness goals",
    icon: "🎯"
  }
];

export default MembershipSection;
