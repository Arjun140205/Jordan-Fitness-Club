import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import "./home.css";
import MembershipSection from "../components/MembershipSection";
import * as Ri from "react-icons/ri";

import headerImage from "../assets/header.png";
import class1Image from "../assets/class-1.jpg";
import class2Image from "../assets/class-2.jpg";
import joinImage from "../assets/join.jpg";
import memberImage from "../assets/member.jpg";

// Animation variants for smooth micro-interactions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
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

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(254, 198, 44, 0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const imageRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <header ref={heroRef} className="section-container relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="header-container"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="header-content">
            <span className="bg-blur"></span>
            <span className="bg-blur header-blur"></span>

            <motion.h4
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2
              }}
              className="text-[var(--secondary-color)] font-semibold mb-4 tracking-wider"
            >
              BEST FITNESS IN THE TOWN
            </motion.h4>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: 0.4
              }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              <span className="text-stroke text-gray-900 dark:text-white">MAKE</span> YOUR BODY SHAPE
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6
              }}
              className="text-gray-600 dark:text-[var(--text-light)] mb-8 max-w-xl leading-relaxed"
            >
              Unleash your potential and embark on a journey towards a stronger,
              fitter, and more confident you. Sign up for 'Make Your Body Shape' now
              and witness the incredible transformation your body is capable of!
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8
              }}
            >
              <Link
                to="/register"
                className="btn-primary btn-shimmer inline-flex items-center gap-2 group"
              >
                Get Started
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Ri.RiArrowRightLine className="text-xl" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="header-image"
            initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.5
            }}
          >
            <motion.img
              src={headerImage}
              alt="Fitness trainer"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4 }
              }}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-3 bg-[var(--secondary-color)] rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </header>

      {/* Programs Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="explore-header"
        >
          <h2 className="section-header text-gray-900 dark:text-white">EXPLORE OUR PROGRAM</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </motion.div>
      </section>

      {/* Why Jordan Fitness Section */}
      <WhySection />

      <MembershipSection />
    </div>
  );
};

// Separate program card component for cleaner hover states
const ProgramCard = ({ program, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="rest"
      whileHover="hover"
      animate={isInView ? "visible" : "hidden"}
      className="modern-card bg-white dark:bg-[var(--primary-color-light)] p-6 rounded-xl shadow-lg cursor-pointer"
    >
      <motion.span
        className="icon-pulse inline-block p-3 bg-[var(--secondary-color-dark)] rounded-lg text-white text-3xl mb-4"
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.4 }
        }}
      >
        {program.icon}
      </motion.span>

      <motion.h4
        className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {program.title}
      </motion.h4>

      <p className="text-gray-600 dark:text-[var(--text-light)] mb-4 leading-relaxed">
        {program.description}
      </p>

      <Link
        to="/register"
        className="text-gray-900 dark:text-white hover:text-[var(--secondary-color)] flex items-center gap-2 font-medium group"
      >
        Join Now
        <motion.span
          className="inline-block"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Ri.RiArrowRightLine className="group-hover:text-[var(--secondary-color)] transition-colors" />
        </motion.span>
      </Link>
    </motion.div>
  );
};

// Why Section Component
const WhySection = () => {
  const features = [
    {
      image: class1Image,
      title: "Modern Equipment",
      description: "State-of-the-art facilities with the latest fitness technology and equipment.",
    },
    {
      image: class2Image,
      title: "Expert Trainers",
      description: "Certified professionals dedicated to helping you achieve your fitness goals.",
    },
    {
      image: memberImage,
      title: "Strong Community",
      description: "Join a supportive community that motivates and inspires you to be your best.",
    },
  ];

  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          WHY JORDAN FITNESS CLUB?
        </h2>
        <p className="text-gray-600 dark:text-[var(--text-light)] max-w-2xl mx-auto leading-relaxed">
          We offer more than just a workout - we provide an experience that transforms lives through fitness, community, and expert guidance.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="modern-card bg-white dark:bg-[var(--primary-color-light)] rounded-xl overflow-hidden shadow-lg"
    >
      <motion.div
        className="feature-card-image h-48 overflow-hidden"
        variants={imageRevealVariants}
      >
        <motion.img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {feature.title}
        </motion.h3>
        <p className="text-gray-600 dark:text-[var(--text-light)] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const programs = [
  {
    title: "Strength",
    description: "Embrace the essence of strength as we delve into its various dimensions physical, mental, and emotional.",
    icon: <Ri.RiBoxingFill />,
  },
  {
    title: "Physical Fitness",
    description: "It encompasses a range of activities that improve health, strength, flexibility, and overall well-being.",
    icon: <Ri.RiHeartPulseFill />,
  },
  {
    title: "Fat Lose",
    description: "Through a combination of workout routines and expert guidance, we'll empower you to reach your goals.",
    icon: <Ri.RiRunLine />,
  },
  {
    title: "Weight Gain",
    description: "Designed for individuals, our program offers an effective approach to gaining weight in a sustainable manner.",
    icon: <Ri.RiShoppingBasketFill />,
  },
];

export default Home;
