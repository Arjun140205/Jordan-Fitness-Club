import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, CheckCircle, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

import logoImg from "../assets/logo.png";
import gymImg from "../assets/gym.jpg";

const schema = yup.object({
  name: yup.string().required("Required").min(2, "Min 2 characters"),
  email: yup.string().email("Invalid email").required("Required"),
  phone: yup.string().required("Required").matches(/^[0-9]{10}$/, "10 digits required"),
  password: yup.string().required("Required").min(6, "Min 6 characters"),
  role: yup.string().oneOf(['user', 'admin']).default('user'),
}).required();

// Staggered entrance
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: 'user' }
  });

  const password = watch("password", "");

  const passwordChecks = {
    length: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasLetter: /[a-zA-Z]/.test(password),
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const phone = '+91' + data.phone;
      await axios.post(endpoints.auth.register, { ...data, phone });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* ─── LEFT: VISUAL PANEL (desktop only) ─── */}
      <div className="auth-visual">
        <motion.img
          src={gymImg}
          alt="Jordan Fitness Club Gym"
          className="auth-visual-img"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="auth-visual-watermark">FITNESS</div>
        <div className="auth-visual-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="auth-visual-tagline">
              Join The <span>Elite</span> Community
            </h2>
            <p className="auth-visual-desc">
              Get access to world-class equipment, expert trainers,
              and a community that pushes you to be your best.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── RIGHT: FORM PANEL ─── */}
      <div className="auth-form-panel">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />

        <div className="auth-form-container">
          <div className="auth-form-inner">
            {/* Logo */}
            <motion.div
              className="auth-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <img src={logoImg} alt="Jordan Fitness Club" className="auth-logo-img" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className="auth-title" variants={fadeSlide}>
                Create Account
              </motion.h1>
              <motion.p className="auth-subtitle" variants={fadeSlide}>
                Start your fitness journey today
              </motion.p>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <motion.div className="auth-field" variants={fadeSlide}>
                  <label className="auth-input-label">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`auth-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  {errors.name && <p className="auth-error">{errors.name.message}</p>}
                </motion.div>

                {/* Email */}
                <motion.div className="auth-field" variants={fadeSlide}>
                  <label className="auth-input-label">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`auth-input ${errors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="auth-error">{errors.email.message}</p>}
                </motion.div>

                {/* Phone */}
                <motion.div className="auth-field" variants={fadeSlide}>
                  <label className="auth-input-label">Phone Number</label>
                  <div className="auth-phone-row">
                    <span className="auth-phone-prefix">+91</span>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={`auth-input ${errors.phone ? 'error' : ''}`}
                      placeholder="9876543210"
                      autoComplete="tel"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="auth-error">{errors.phone.message}</p>}
                </motion.div>

                {/* Password */}
                <motion.div className="auth-field" variants={fadeSlide}>
                  <label className="auth-input-label">Password</label>
                  <div className="auth-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register("password")}
                      className={`auth-input ${errors.password ? 'error' : ''}`}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="auth-password-toggle"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="auth-error">{errors.password.message}</p>}
                </motion.div>

                {/* Strength Indicator */}
                {password && (
                  <motion.div
                    className="auth-strength"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="auth-strength-bars">
                      <div className={`auth-strength-bar ${passwordChecks.length ? 'active' : ''}`} />
                      <div className={`auth-strength-bar ${passwordChecks.hasLetter ? 'active' : ''}`} />
                      <div className={`auth-strength-bar ${passwordChecks.hasNumber ? 'active' : ''}`} />
                    </div>
                    <div className="auth-strength-labels">
                      <span className={`auth-strength-label ${passwordChecks.length ? 'active' : ''}`}>6+ chars</span>
                      <span className={`auth-strength-label ${passwordChecks.hasLetter ? 'active' : ''}`}>Letter</span>
                      <span className={`auth-strength-label ${passwordChecks.hasNumber ? 'active' : ''}`}>Number</span>
                    </div>
                  </motion.div>
                )}

                {/* Role */}
                <motion.div className="auth-field" variants={fadeSlide}>
                  <label className="auth-input-label">Account Type</label>
                  <select {...register("role")} className="auth-select">
                    <option value="user">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="auth-submit"
                  disabled={isLoading}
                  variants={fadeSlide}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <span className="auth-spinner" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>

                {/* Feature pills */}
                <motion.div className="auth-feature-pills" variants={fadeSlide}>
                  <span className="auth-feature-pill"><CheckCircle /> Free Trial</span>
                  <span className="auth-feature-pill"><TrendingUp /> Track Progress</span>
                  <span className="auth-feature-pill"><Users /> Community</span>
                </motion.div>

                {/* Terms */}
                <motion.p className="auth-terms" variants={fadeSlide}>
                  By registering, you agree to our{' '}
                  <Link to="/terms">Terms</Link>
                  {' & '}
                  <Link to="/privacy">Privacy Policy</Link>
                </motion.p>
              </form>

              <div className="auth-divider"><span>or</span></div>

              <motion.div className="auth-footer" variants={fadeSlide} style={{ marginTop: 0 }}>
                <span>Already have an account? </span>
                <Link to="/login" className="auth-link">Sign In</Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
