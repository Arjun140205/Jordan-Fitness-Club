import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowRight, Dumbbell } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

// Import a fitness image - using the existing header image
import heroImage from "../assets/header.png";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
}).required();

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

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
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    try {
      await axios.post(`${endpoints.auth.login.replace('/login', '/forgot-password')}`, { email: forgotEmail });
      toast.success("Reset code sent to your email");
      setForgotStep(2);
    } catch (err) {
      if (err.response?.status === 404) {
        setForgotError("Email not registered.");
      } else {
        toast.error(err.response?.data?.message || "Failed to send reset code");
      }
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
      toast.success("Password reset successful!");
      setShowForgot(false);
      setForgotStep(1);
      setForgotEmail("");
      setForgotCode("");
      setForgotNewPass("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
    setForgotLoading(false);
  };

  const resetForgotState = () => {
    setShowForgot(false);
    setForgotStep(1);
    setForgotEmail("");
    setForgotCode("");
    setForgotNewPass("");
    setForgotError("");
  };

  return (
    <div className="auth-split-container">
      {/* Background Effects */}
      <div className="auth-gradient-bg" />
      <div className="auth-noise" />

      {/* Brand Panel - Desktop Only */}
      <div className="auth-brand-panel">
        <div className="auth-brand-image">
          <img src={heroImage} alt="Fitness" />
        </div>

        <div className="auth-grid-lines" />
        <div className="auth-corner-accent top-left" />
        <div className="auth-corner-accent bottom-right" />

        {/* Cinematic Light Streaks */}
        <div className="auth-light-streak" />
        <div className="auth-light-streak" />
        <div className="auth-light-streak" />

        <motion.div
          className="auth-brand-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="auth-brand-tagline">
            <span className="auth-text-reveal"><span>Transform</span></span>
            <br />
            <span className="auth-text-reveal" style={{ animationDelay: '0.1s' }}><span>Your</span></span>
            {' '}
            <span className="auth-text-reveal highlight" style={{ animationDelay: '0.2s' }}><span>Limits</span></span>
          </h1>
          <p className="auth-brand-subtitle">
            Join the elite community of fitness enthusiasts pushing beyond boundaries every single day.
          </p>
        </motion.div>
      </div>

      {/* Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--secondary-color)] to-[var(--secondary-color-dark)] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Jordan Fitness</span>
          </motion.div>

          {!showForgot ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="auth-heading">Welcome back</h2>
                <p className="auth-subheading">Enter your credentials to access your account</p>
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <motion.div
                  className="premium-input-wrapper auth-animate-in"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <input
                    type="email"
                    {...register("email")}
                    className={`premium-input ${errors.email ? 'error' : ''}`}
                    placeholder="Email"
                    autoComplete="email"
                  />
                  <label className="premium-label">Email</label>
                  <div className="premium-input-line" />
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Password Input */}
                <motion.div
                  className="premium-input-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register("password")}
                    className={`premium-input ${errors.password ? 'error' : ''}`}
                    placeholder="Password"
                    autoComplete="current-password"
                    style={{ paddingRight: '3rem' }}
                  />
                  <label className="premium-label">Password</label>
                  <div className="premium-input-line" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}
                </motion.div>

                {/* Options Row */}
                <motion.div
                  className="auth-options-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="auth-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="auth-forgot-link"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className={`premium-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <span className="button-spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <motion.div
                className="auth-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="auth-link">
                    Create one
                  </Link>
                </p>
              </motion.div>
            </>
          ) : (
            /* Forgot Password Flow */
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="auth-heading">
                  {forgotStep === 1 ? 'Reset Password' : 'Enter Code'}
                </h2>
                <p className="auth-subheading">
                  {forgotStep === 1
                    ? "Enter your email to receive a reset code"
                    : "Check your email for the 6-digit code"
                  }
                </p>
              </motion.div>

              <form onSubmit={forgotStep === 1 ? handleForgotRequest : handleForgotReset}>
                {forgotStep === 1 ? (
                  <motion.div
                    className="premium-input-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="premium-input"
                      placeholder="Email"
                      required
                    />
                    <label className="premium-label">Email Address</label>
                    <div className="premium-input-line" />
                    {forgotError && (
                      <p className="error-message">
                        {forgotError}{' '}
                        <Link to="/register" className="auth-link">Create account</Link>
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      className="premium-input-wrapper"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <input
                        type="text"
                        value={forgotCode}
                        onChange={(e) => setForgotCode(e.target.value)}
                        className="premium-input"
                        placeholder="Code"
                        required
                      />
                      <label className="premium-label">6-Digit Code</label>
                      <div className="premium-input-line" />
                    </motion.div>

                    <motion.div
                      className="premium-input-wrapper"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <input
                        type="password"
                        value={forgotNewPass}
                        onChange={(e) => setForgotNewPass(e.target.value)}
                        className="premium-input"
                        placeholder="New Password"
                        required
                      />
                      <label className="premium-label">New Password</label>
                      <div className="premium-input-line" />
                    </motion.div>
                  </>
                )}

                <motion.div
                  className="flex gap-3 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={resetForgotState}
                    className="flex-1 py-3 px-4 border border-white/10 rounded-lg text-white/60 text-sm font-medium uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`premium-button flex-1 ${forgotLoading ? 'loading' : ''}`}
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? (
                      <>
                        <span className="button-spinner" />
                        {forgotStep === 1 ? 'Sending...' : 'Resetting...'}
                      </>
                    ) : (
                      forgotStep === 1 ? 'Send Code' : 'Reset Password'
                    )}
                  </button>
                </motion.div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
