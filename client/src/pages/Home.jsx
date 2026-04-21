import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import "./home.css";
import * as Ri from "react-icons/ri";

import headerImage from "../assets/header.png";
import class1Image from "../assets/class-1.jpg";
import class2Image from "../assets/class-2.jpg";
import memberImage from "../assets/member.jpg";
import gymImage from "../assets/gym.jpg";

/* ─── Animated Counter ─────────────────────────────────────── */
const useAnimatedCounter = (target, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return { count, ref };
};

/* ─── Marquee Ticker ───────────────────────────────────────── */
const MarqueeTicker = () => {
  const items = [
    "STRENGTH TRAINING",
    "FAT LOSS",
    "WEIGHT GAIN",
    "CARDIO SESSIONS",
    "EXPERT COACHING",
    "PREMIUM EQUIPMENT",
    "GROUP CLASSES",
    "PERSONAL TRAINING",
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Magnetic Button ──────────────────────────────────────── */
const MagneticLink = ({ to, children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

/* ─── Hero Section ─────────────────────────────────────────── */
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <header ref={heroRef} className="section-container relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="header-container"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="header-content">
          <span className="bg-blur" />
          <span className="bg-blur header-blur" />

          <motion.h4
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="text-[var(--secondary-color)] font-semibold mb-4 tracking-wider"
          >
            BEST FITNESS IN THE TOWN
          </motion.h4>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="text-stroke text-gray-900 dark:text-white">MAKE</span> YOUR BODY SHAPE
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
            className="text-gray-600 dark:text-[var(--text-light)] mb-8 max-w-xl leading-relaxed"
          >
            Unleash your potential and embark on a journey towards a stronger,
            fitter, and more confident you. Sign up for 'Make Your Body Shape' now
            and witness the incredible transformation your body is capable of!
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.8 }}
          >
            <Link to="/register" className="btn-primary btn-shimmer inline-flex items-center gap-2 group">
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
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.5 }}
        >
          <motion.img
            src={headerImage}
            alt="Fitness trainer"
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
  );
};

/* ─── Stats Band ───────────────────────────────────────────── */
const StatBandItem = ({ value, suffix, label, icon, index }) => {
  const { count, ref } = useAnimatedCounter(value, 2);
  return (
    <motion.div
      ref={ref}
      className="stat-band-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-band-icon">{icon}</div>
      <div className="stat-band-number">
        {count}<span className="stat-band-suffix">{suffix}</span>
      </div>
      <div className="stat-band-label">{label}</div>
    </motion.div>
  );
};

const StatsBand = () => {
  const stats = [
    { value: 500, suffix: "+", label: "Active Members", icon: <Ri.RiGroupFill /> },
    { value: 50, suffix: "+", label: "Programs Available", icon: <Ri.RiCalendarCheckFill /> },
    { value: 10, suffix: "+", label: "Expert Trainers", icon: <Ri.RiMedalFill /> },
    { value: 24, suffix: "/7", label: "Gym Access", icon: <Ri.RiTimeFill /> },
  ];

  return (
    <section className="stats-band-section">
      <div className="stats-band-inner">
        {stats.map((s, i) => (
          <StatBandItem key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
};

/* ─── Programs Section ─────────────────────────────────────── */
const programs = [
  {
    title: "Strength",
    description: "Embrace the essence of strength as we delve into its various dimensions — physical, mental, and emotional.",
    icon: <Ri.RiBoxingFill />,
    intensity: 5,
    color: "#fec62c",
    tag: "HIGH INTENSITY",
  },
  {
    title: "Physical Fitness",
    description: "A range of activities that improve health, strength, flexibility, and overall well-being.",
    icon: <Ri.RiHeartPulseFill />,
    intensity: 3,
    color: "#fec62c",
    tag: "BALANCED",
  },
  {
    title: "Fat Loss",
    description: "Workout routines and expert guidance designed to empower you to reach your fat-loss goals.",
    icon: <Ri.RiRunLine />,
    intensity: 4,
    color: "#fec62c",
    tag: "PROGRESSIVE",
  },
  {
    title: "Weight Gain",
    description: "An effective, sustainable approach to gaining healthy weight with structured nutrition and training.",
    icon: <Ri.RiShoppingBasketFill />,
    intensity: 3,
    color: "#fec62c",
    tag: "STRUCTURED",
  },
];

const ProgramCard = ({ program, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="prog-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      <div className="prog-card-num">{String(index + 1).padStart(2, "0")}</div>

      <div className="prog-card-top">
        <div className="prog-card-tag">{program.tag}</div>
        <motion.div
          className="prog-card-icon"
          whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.5 } }}
        >
          {program.icon}
        </motion.div>
      </div>

      <h3 className="prog-card-title">{program.title}</h3>
      <p className="prog-card-desc">{program.description}</p>

      <div className="prog-card-bottom">
        <div className="prog-intensity">
          <span className="prog-intensity-label">Intensity</span>
          <div className="prog-intensity-bars">
            {[1, 2, 3, 4, 5].map((b) => (
              <motion.span
                key={b}
                className={`intensity-bar ${b <= program.intensity ? "active" : ""}`}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: index * 0.12 + b * 0.07, duration: 0.4 }}
                style={{ height: `${8 + b * 4}px` }}
              />
            ))}
          </div>
        </div>
        <Link to="/register" className="prog-cta">
          Join <Ri.RiArrowRightLine />
        </Link>
      </div>

      {/* Hover glow */}
      <div className="prog-card-glow" />
    </motion.div>
  );
};

const ProgramsSection = () => {
  return (
    <section className="programs-v2-section">
      <div className="programs-v2-inner">
        <motion.div
          className="programs-v2-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">Our Programs</span>
          <h2 className="programs-v2-title">
            UNLEASH YOUR<br />
            <span className="title-outline">POTENTIAL</span>
          </h2>
          <p className="programs-v2-sub">
            Tailored fitness programs designed to push your limits and transform your body.
          </p>
        </motion.div>

        <div className="prog-cards-grid">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Why Section ──────────────────────────────────────────── */
const features = [
  {
    image: class1Image,
    title: "Modern Equipment",
    description: "State-of-the-art facilities with the latest fitness technology and premium equipment for every workout style.",
    icon: <Ri.RiSettings3Fill />,
    tag: "Facilities",
    accent: "#fec62c",
  },
  {
    image: class2Image,
    title: "Expert Trainers",
    description: "Certified professionals with years of experience dedicated to helping you crush your fitness goals.",
    icon: <Ri.RiUserStarFill />,
    tag: "Coaching",
    accent: "#fec62c",
  },
  {
    image: memberImage,
    title: "Strong Community",
    description: "A supportive network of like-minded individuals who motivate and inspire each other daily.",
    icon: <Ri.RiTeamFill />,
    tag: "Community",
    accent: "#fec62c",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="feat-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="feat-card-img-wrap">
        <motion.img
          src={feature.image}
          alt={feature.title}
          className="feat-card-img"
          whileHover={{ scale: 1.08, transition: { duration: 0.6 } }}
        />
        <div className="feat-card-overlay" />
        <span className="feat-card-tag">{feature.tag}</span>
        <div className="feat-card-num">{String(index + 1).padStart(2, "0")}</div>
      </div>

      <div className="feat-card-body">
        <div className="feat-card-icon">{feature.icon}</div>
        <h3 className="feat-card-title">{feature.title}</h3>
        <p className="feat-card-desc">{feature.description}</p>
        <Link to="/about" className="feat-card-link">
          <span>Discover More</span>
          <Ri.RiArrowRightLine className="feat-link-arrow" />
        </Link>
      </div>
    </motion.div>
  );
};

const WhySection = () => {
  return (
    <section className="why-v2-section">
      <div className="why-v2-inner">
        {/* Side label */}
        <div className="why-v2-side-label">
          <span>WHY JORDAN</span>
        </div>

        <motion.div
          className="why-v2-header"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">Why Choose Us</span>
          <h2 className="why-v2-title">
            MORE THAN<br />A <span className="title-gold">GYM.</span>
          </h2>
          <p className="why-v2-sub">
            An experience that transforms lives through world-class fitness, community, and expert guidance.
          </p>
          <Link to="/about" className="why-v2-cta">
            Our Story <Ri.RiArrowRightLine />
          </Link>
        </motion.div>

        <div className="feat-cards-grid">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Testimonial / Social Proof Band ─────────────────────── */
const SocialProofSection = () => {
  const reviews = [
    {
      name: "Arjun Singh",
      role: "Member since 2023",
      text: "Jordan Fitness Club completely transformed my physique. The trainers are world-class.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Premium Member",
      text: "The atmosphere here is electric. I've never felt more motivated in my life.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Elite Member",
      text: "State-of-the-art equipment and a community that pushes you every single day.",
      rating: 5,
    },
  ];

  return (
    <section className="social-proof-section">
      <div className="social-proof-inner">
        <motion.div
          className="social-proof-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">Member Stories</span>
          <h2 className="social-proof-title">REAL RESULTS,<br /><span className="title-outline">REAL PEOPLE.</span></h2>
        </motion.div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="review-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="review-stars">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Ri.RiStarFill key={s} />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="review-avatar">
                  {review.name[0]}
                </div>
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-role">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Membership Section ───────────────────────────────────── */
const membershipPlans = [
  {
    name: "BASIC",
    tagline: "Perfect for beginners",
    price: "29.99",
    features: [
      "Access to gym floor",
      "Basic equipment usage",
      "Locker room access",
      "Free fitness assessment",
      "Standard gym hours",
    ],
    popular: false,
  },
  {
    name: "PREMIUM",
    tagline: "Most Popular Choice",
    price: "49.99",
    features: [
      "Everything in Basic",
      "Group fitness classes",
      "Personal training (1×/month)",
      "Nutrition consultation",
      "Extended gym hours",
    ],
    popular: true,
  },
  {
    name: "ELITE",
    tagline: "Ultimate Fitness Experience",
    price: "79.99",
    features: [
      "Everything in Premium",
      "Unlimited fitness classes",
      "Personal training (2×/month)",
      "Recovery zone access",
      "Guest passes (2/month)",
    ],
    popular: false,
  },
];

const MembershipCard = ({ plan, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`membership-card ${plan.popular ? "popular" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 22 } }}
    >
      {plan.popular && (
        <div className="membership-popular-badge">
          <Ri.RiStarFill /> MOST POPULAR
        </div>
      )}

      <div className="membership-card-top">
        <div className="membership-plan-name">{plan.name}</div>
        <div className="membership-plan-tagline">{plan.tagline}</div>
      </div>

      <div className="membership-price-wrap">
        <span className="membership-currency">$</span>
        <span className="membership-price">{plan.price}</span>
        <span className="membership-period">/mo</span>
      </div>

      <ul className="membership-features">
        {plan.features.map((feat, i) => (
          <motion.li
            key={i}
            className="membership-feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + i * 0.07 + 0.3, duration: 0.4 }}
          >
            <Ri.RiCheckboxCircleLine className="membership-check" />
            {feat}
          </motion.li>
        ))}
      </ul>

      <Link
        to="/register"
        className={`membership-btn ${plan.popular ? "membership-btn-primary" : "membership-btn-secondary"}`}
      >
        Get Started <Ri.RiArrowRightLine />
      </Link>

      <div className="membership-card-glow" />
    </motion.div>
  );
};

const MembershipV2Section = () => {
  return (
    <section className="membership-v2-section">
      {/* Background gym image with overlay */}
      <div className="membership-bg">
        <img src={gymImage} alt="" className="membership-bg-img" />
        <div className="membership-bg-overlay" />
      </div>

      <div className="membership-v2-inner">
        <motion.div
          className="membership-v2-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">Membership Plans</span>
          <h2 className="membership-v2-title">
            INVEST IN<br />YOUR<span className="title-gold"> BODY.</span>
          </h2>
          <p className="membership-v2-sub">
            Join Jordan Fitness Club today and experience the perfect blend of premium equipment, expert guidance, and a motivating atmosphere.
          </p>
        </motion.div>

        <div className="membership-cards-grid">
          {membershipPlans.map((plan, i) => (
            <MembershipCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA Banner ───────────────────────────────────────────── */
const CTABanner = () => {
  return (
    <section className="cta-banner-section">
      <motion.div
        className="cta-banner-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cta-banner-text">
          <h2 className="cta-banner-title">READY TO START<br /><span className="title-gold">YOUR JOURNEY?</span></h2>
          <p className="cta-banner-sub">Join thousands already transforming their bodies at Jordan Fitness Club.</p>
        </div>
        <div className="cta-banner-actions">
          <MagneticLink to="/register" className="cta-primary-btn">
            Join Now <Ri.RiArrowRightLine />
          </MagneticLink>
          <Link to="/about" className="cta-secondary-btn">
            Learn More
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

/* ─── Main Home Component ──────────────────────────────────── */
const Home = () => {
  return (
    <div className="home-root">
      <HeroSection />
      <MarqueeTicker />
      <StatsBand />
      <ProgramsSection />
      <WhySection />
      <SocialProofSection />
      <MembershipV2Section />
      <CTABanner />
    </div>
  );
};

export default Home;
