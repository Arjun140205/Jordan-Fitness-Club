import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./home.css";
import { 
  RiBoxingFill, 
  RiHeartPulseFill, 
  RiRunLine,
  RiShoppingBasketFill,
  RiUserStarFill,
  RiVidiconFill,
  RiBuildingLine,
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiDoubleQuotesR,
  RiStarFill,
  RiStarHalfFill,
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterFill
} from 'react-icons/ri';

import headerImage from "../assets/header.png";
import class1Image from "../assets/class-1.jpg";
import class2Image from "../assets/class-2.jpg";
import joinImage from "../assets/join.jpg";
import memberImage from "../assets/member.jpg";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div>
      <header className="section-container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="header-container"
        >
          <div className="header-content">
            <span className="bg-blur"></span>
            <span className="bg-blur header-blur"></span>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[var(--secondary-color)] font-semibold mb-4"
            >
              BEST FITNESS IN THE TOWN
            </motion.h4>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold text-white mb-6"
            >
              <span className="text-stroke">MAKE</span> YOUR BODY SHAPE
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--text-light)] mb-8 max-w-xl"
            >
              Unleash your potential and embark on a journey towards a stronger,
              fitter, and more confident you. Sign up for 'Make Your Body Shape' now
              and witness the incredible transformation your body is capable of!
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="header-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img src={headerImage} alt="header" />
          </motion.div>
        </motion.div>
      </header>

      <section className="section-container">
        <div className="explore-header">
          <h2 className="section-header">EXPLORE OUR PROGRAM</h2>
          <div className="explore-nav">
            <span><RiArrowLeftLine /></span>
            <span><RiArrowRightLine /></span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index }}
              className="card-hover bg-[var(--primary-color-light)] p-6 rounded-xl"
            >
              <span className="inline-block p-3 bg-[var(--secondary-color-dark)] rounded-lg text-white text-3xl mb-4">
                {program.icon}
              </span>
              <h4 className="text-xl font-semibold text-white mb-2">{program.title}</h4>
              <p className="text-[var(--text-light)] mb-4">{program.description}</p>
              <Link to="/register" className="text-white hover:text-[var(--secondary-color)] flex items-center gap-2">
                Join Now <RiArrowRightLine />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Continue with other sections... */}
    </div>
  );
};

const programs = [
  {
    title: "Strength",
    description: "Embrace the essence of strength as we delve into its various dimensions physical, mental, and emotional.",
    icon: <RiBoxingFill />,
  },
  {
    title: "Physical Fitness",
    description: "It encompasses a range of activities that improve health, strength, flexibility, and overall well-being.",
    icon: <RiHeartPulseFill />,
  },
  {
    title: "Fat Lose",
    description: "Through a combination of workout routines and expert guidance, we'll empower you to reach your goals.",
    icon: <RiRunLine />,
  },
  {
    title: "Weight Gain",
    description: "Designed for individuals, our program offers an effective approach to gaining weight in a sustainable manner.",
    icon: <RiShoppingBasketFill />,
  },
];

export default Home;
