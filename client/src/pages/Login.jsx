import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Shield, Zap, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

import logoImg from "../assets/logo.png";
import gymImg from "../assets/gym.jpg";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
}).required();

// Staggered entrance
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
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
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(endpoints.auth.login, data);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", data.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      await login(res.data);
      toast.success("Welcome back!");
      setTimeout(() => {
        const userRole = res.data.user?.role || res.data.role;
        navigate(userRole === "admin" ? "/admin" : "/dashboard");
      }, 600);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await axios.post(`${endpoints.auth.login.replace('/login', '/forgot-password')}`, { email: forgotEmail });
      toast.success("Code sent to your email");
      setForgotStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send code");
    }
    setForgotLoading(false);
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await axios.post(`${endpoints.auth.login.replace('/login', '/reset-password')}`, {
        email: forgotEmail,
        code: forgotCode,
        newPassword: forgotNewPass,
      });
      toast.success("Password reset successful");
      resetForgotState();
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
    setForgotLoading(false);
  };

  const resetForgotState = () => {
    setShowForgot(false);
    setForgotStep(1);
    setForgotEmail("");
    setForgotCode("");
    setForgotNewPass("");
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
        <div className="auth-visual-watermark">JORDAN</div>
        <div className="auth-visual-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="auth-visual-tagline">
              Your <span>Transformation</span> Starts Here
            </h2>
            <p className="auth-visual-desc">
              Join thousands of members who have already made the commitment
              to a healthier, stronger version of themselves.
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

            <AnimatePresence mode="wait">
              {!showForgot ? (
                <motion.div
                  key="login-form"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h1 className="auth-title" variants={fadeSlide}>
                    Welcome Back
                  </motion.h1>
                  <motion.p className="auth-subtitle" variants={fadeSlide}>
                    Sign in to continue your journey
                  </motion.p>

                  <form onSubmit={handleSubmit(onSubmit)}>
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

                    <motion.div className="auth-field" variants={fadeSlide}>
                      <label className="auth-input-label">Password</label>
                      <div className="auth-input-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          {...register("password")}
                          className={`auth-input ${errors.password ? 'error' : ''}`}
                          placeholder="••••••••"
                          autoComplete="current-password"
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

                    <motion.div className="auth-options-row" variants={fadeSlide}>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="auth-forgot-btn"
                      >
                        Forgot password?
                      </button>
                    </motion.div>

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
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </motion.button>
                  </form>

                  {/* Feature pills */}
                  <motion.div className="auth-feature-pills" variants={fadeSlide}>
                    <span className="auth-feature-pill"><Shield /> Secure</span>
                    <span className="auth-feature-pill"><Zap /> Fast</span>
                    <span className="auth-feature-pill"><Star /> Premium</span>
                  </motion.div>

                  <motion.div className="auth-divider" variants={fadeSlide}>
                    <span>or</span>
                  </motion.div>

                  <motion.div className="auth-footer" variants={fadeSlide} style={{ marginTop: 0 }}>
                    <span>New here? </span>
                    <Link to="/register" className="auth-link">Create an account</Link>
                  </motion.div>
                </motion.div>
              ) : (
                /* ─── FORGOT PASSWORD ─── */
                <motion.div
                  key="forgot-form"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h1 className="auth-title" variants={fadeSlide}>
                    {forgotStep === 1 ? 'Reset Password' : 'Set New Password'}
                  </motion.h1>
                  <motion.p className="auth-subtitle" variants={fadeSlide}>
                    {forgotStep === 1
                      ? "We'll send a verification code to your email"
                      : "Enter the code and choose a new password"
                    }
                  </motion.p>

                  <form onSubmit={forgotStep === 1 ? handleForgotRequest : handleForgotReset}>
                    {forgotStep === 1 ? (
                      <motion.div className="auth-field" variants={fadeSlide}>
                        <label className="auth-input-label">Email Address</label>
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="auth-input"
                          placeholder="you@example.com"
                          required
                        />
                      </motion.div>
                    ) : (
                      <>
                        <motion.div className="auth-field" variants={fadeSlide}>
                          <label className="auth-input-label">Verification Code</label>
                          <input
                            type="text"
                            value={forgotCode}
                            onChange={(e) => setForgotCode(e.target.value)}
                            className="auth-input"
                            placeholder="123456"
                            required
                          />
                        </motion.div>
                        <motion.div className="auth-field" variants={fadeSlide}>
                          <label className="auth-input-label">New Password</label>
                          <input
                            type="password"
                            value={forgotNewPass}
                            onChange={(e) => setForgotNewPass(e.target.value)}
                            className="auth-input"
                            placeholder="••••••••"
                            required
                          />
                        </motion.div>
                      </>
                    )}

                    <motion.div className="flex gap-3 mt-5" variants={fadeSlide}>
                      <button
                        type="button"
                        onClick={resetForgotState}
                        className="auth-back-btn"
                        style={{ flex: 1 }}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="auth-submit"
                        style={{ flex: 2 }}
                        disabled={forgotLoading}
                      >
                        {forgotLoading ? (
                          <>
                            <span className="auth-spinner" />
                            {forgotStep === 1 ? 'Sending...' : 'Resetting...'}
                          </>
                        ) : (
                          forgotStep === 1 ? 'Send Code' : 'Reset Password'
                        )}
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
