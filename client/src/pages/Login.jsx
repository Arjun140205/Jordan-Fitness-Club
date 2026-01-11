import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Dumbbell } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
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
      toast.success("Welcome back");

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
    <div className="designer-auth">
      {/* Background Typography Art */}
      <div className="designer-auth-typography top">JFC</div>
      <div className="designer-auth-typography bottom">FIT</div>

      {/* Geometric Accent Lines */}
      <div className="designer-accent-line horizontal top-left" />
      <div className="designer-accent-line horizontal top-right" />
      <div className="designer-accent-line horizontal bottom-left" />
      <div className="designer-accent-line vertical left-vertical" />
      <div className="designer-accent-line vertical right-vertical" />

      {/* Main Card */}
      <motion.div
        className="designer-card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <div className="designer-logo designer-fade-in">
          <div className="designer-logo-mark">
            <Dumbbell size={20} />
          </div>
        </div>

        {!showForgot ? (
          <>
            <motion.h1
              className="designer-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Sign In
            </motion.h1>
            <motion.p
              className="designer-subheading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Access your account
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                className="designer-input-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  {...register("email")}
                  className={`designer-input ${errors.email ? 'error' : ''}`}
                  placeholder="Email"
                  autoComplete="email"
                />
                <label className="designer-label">Email</label>
                <div className="designer-input-line" />
                {errors.email && <p className="designer-error">{errors.email.message}</p>}
              </motion.div>

              <motion.div
                className="designer-input-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                  className={`designer-input ${errors.password ? 'error' : ''}`}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <label className="designer-label">Password</label>
                <div className="designer-input-line" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="designer-password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && <p className="designer-error">{errors.password.message}</p>}
              </motion.div>

              <motion.div
                className="designer-options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="designer-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="designer-text-button"
                >
                  Forgot?
                </button>
              </motion.div>

              <motion.button
                type="submit"
                className="designer-button"
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <span className="designer-spinner" />
                    Authenticating
                  </>
                ) : (
                  'Enter'
                )}
              </motion.button>
            </form>

            <motion.div
              className="designer-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>New here? </span>
              <Link to="/register" className="designer-link">Create Account</Link>
            </motion.div>
          </>
        ) : (
          /* Forgot Password Flow */
          <>
            <motion.h1
              className="designer-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {forgotStep === 1 ? 'Reset' : 'New Password'}
            </motion.h1>
            <motion.p
              className="designer-subheading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {forgotStep === 1 ? 'Enter your email' : 'Enter code and new password'}
            </motion.p>

            <form onSubmit={forgotStep === 1 ? handleForgotRequest : handleForgotReset}>
              {forgotStep === 1 ? (
                <motion.div
                  className="designer-input-group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="designer-input"
                    placeholder="Email"
                    required
                  />
                  <label className="designer-label">Email Address</label>
                  <div className="designer-input-line" />
                </motion.div>
              ) : (
                <>
                  <motion.div
                    className="designer-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <input
                      type="text"
                      value={forgotCode}
                      onChange={(e) => setForgotCode(e.target.value)}
                      className="designer-input"
                      placeholder="Code"
                      required
                    />
                    <label className="designer-label">6-Digit Code</label>
                    <div className="designer-input-line" />
                  </motion.div>

                  <motion.div
                    className="designer-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <input
                      type="password"
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      className="designer-input"
                      placeholder="New Password"
                      required
                    />
                    <label className="designer-label">New Password</label>
                    <div className="designer-input-line" />
                  </motion.div>
                </>
              )}

              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  type="button"
                  onClick={resetForgotState}
                  className="designer-text-button"
                  style={{ flex: 1, textAlign: 'center', padding: '1rem' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="designer-button"
                  style={{ flex: 2 }}
                  disabled={forgotLoading}
                >
                  {forgotLoading ? (
                    <>
                      <span className="designer-spinner" />
                      {forgotStep === 1 ? 'Sending' : 'Resetting'}
                    </>
                  ) : (
                    forgotStep === 1 ? 'Send Code' : 'Reset'
                  )}
                </button>
              </motion.div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
