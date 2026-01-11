import { motion, useInView } from "framer-motion";
import { RiCheckboxCircleLine, RiArrowRightLine, RiStarFill } from 'react-icons/ri';
import { Link } from "react-router-dom";
import { useRef } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const MembershipSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black dark:from-black dark:to-gray-900 
                        light:from-gray-100 light:to-gray-200 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--secondary-color)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--secondary-color)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="max-w-[var(--max-width)] mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-[var(--secondary-color)]/10 rounded-full text-[var(--secondary-color)] text-sm font-semibold mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            MEMBERSHIP PLANS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            MEMBERSHIP THAT FITS YOU
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join Jordan Fitness Club today and experience the perfect blend of premium equipment, expert guidance, and a motivating atmosphere.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {membershipPlans.map((plan, index) => (
            <MembershipCard
              key={plan.name}
              plan={plan}
              index={index}
              isPopular={index === 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MembershipCard = ({ plan, index, isPopular }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl 
                  border ${isPopular ? 'border-[var(--secondary-color)]' : 'border-gray-800'} 
                  hover:border-[var(--secondary-color)] transition-colors duration-300
                  ${isPopular ? 'md:scale-105 md:-my-4' : ''}`}
      style={{
        boxShadow: isPopular
          ? '0 0 40px rgba(254, 198, 44, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--secondary-color)] rounded-full flex items-center gap-1"
        >
          <RiStarFill className="text-black text-sm" />
          <span className="text-black text-sm font-bold">MOST POPULAR</span>
        </motion.div>
      )}

      <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
      <p className="text-gray-400 mb-6">{plan.description}</p>

      <div className="mb-8">
        <motion.span
          className="text-5xl font-bold text-white"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            delay: index * 0.1 + 0.3
          }}
        >
          ${plan.price}
        </motion.span>
        <span className="text-gray-400">/month</span>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            custom={i}
            variants={featureVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RiCheckboxCircleLine className="text-[var(--secondary-color)] text-xl mt-0.5 flex-shrink-0" />
            </motion.span>
            <span className="text-gray-300">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to="/register"
          className={`w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl 
                     font-semibold transition-all duration-300 group
                     ${isPopular
              ? 'bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] text-black'
              : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-[var(--secondary-color)]'
            }`}
        >
          Get Started
          <motion.span
            className="inline-block"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RiArrowRightLine className="text-xl" />
          </motion.span>
        </Link>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(254, 198, 44, 0.1) 0%, transparent 70%)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
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
      "Personal training sessions(2x/month)",
      "Recovery zone access",
      "Guest passes (2/month)"
    ]
  }
];

export default MembershipSection;
