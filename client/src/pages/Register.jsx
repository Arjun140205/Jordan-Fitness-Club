import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowRight, Dumbbell, Check } from "lucide-react";
import { useState } from "react";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

// Import fitness image
import heroImage from "../assets/header.png";

const schema = yup.object({
  name: yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: yup.string().oneOf(['user', 'admin']).default('user'),
}).required();

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user'
    }
  });

  const password = watch("password", "");

  // Password strength indicators
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
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
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
            <span className="auth-text-reveal"><span>Begin</span></span>
            <br />
            <span className="auth-text-reveal" style={{ animationDelay: '0.1s' }}><span>Your</span></span>
            {' '}
            <span className="auth-text-reveal highlight" style={{ animationDelay: '0.2s' }}><span>Journey</span></span>
          </h1>
          <p className="auth-brand-subtitle">
            Your transformation starts with a single step. Join thousands who've already redefined their potential.
          </p>

          {/* Feature List */}
          <motion.div
            className="mt-10 space-y-4 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              "Access to premium equipment",
              "Expert personal trainers",
              "Flexible membership plans"
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-white/60"
              >
                <div className="w-5 h-5 rounded-full bg-[var(--secondary-color)]/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[var(--secondary-color)]" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--secondary-color)] to-[var(--secondary-color-dark)] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Jordan Fitness</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="auth-heading">Create account</h2>
            <p className="auth-subheading">Start your fitness journey today</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <motion.div
              className="premium-input-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <input
                type="text"
                {...register("name")}
                className={`premium-input ${errors.name ? 'error' : ''}`}
                placeholder="Full Name"
                autoComplete="name"
              />
              <label className="premium-label">Full Name</label>
              <div className="premium-input-line" />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="premium-input-wrapper"
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
              <label className="premium-label">Email Address</label>
              <div className="premium-input-line" />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Phone Input */}
            <motion.div
              className="premium-input-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="phone-input-wrapper">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  {...register("phone")}
                  className={`premium-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  maxLength={10}
                />
              </div>
              <label className="premium-label" style={{ left: '5rem' }}>Phone Number</label>
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
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
                autoComplete="new-password"
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

            {/* Password Strength Indicator */}
            {password && (
              <motion.div
                className="mb-6 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-1">
                  {[passwordChecks.length, passwordChecks.hasLetter, passwordChecks.hasNumber].map((check, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${check ? 'bg-[var(--secondary-color)]' : 'bg-white/10'
                        }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <span className={passwordChecks.length ? 'text-[var(--secondary-color)]' : 'text-white/40'}>
                    ✓ 6+ characters
                  </span>
                  <span className={passwordChecks.hasLetter ? 'text-[var(--secondary-color)]' : 'text-white/40'}>
                    ✓ Contains letter
                  </span>
                  <span className={passwordChecks.hasNumber ? 'text-[var(--secondary-color)]' : 'text-white/40'}>
                    ✓ Contains number
                  </span>
                </div>
              </motion.div>
            )}

            {/* Role Select */}
            <motion.div
              className="premium-input-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <select
                {...register("role")}
                className="premium-select"
              >
                <option value="user">Member</option>
                <option value="admin">Admin</option>
              </select>
              <label className="premium-label" style={{ top: '0.5rem', fontSize: '0.75rem', color: 'var(--secondary-color)' }}>
                Account Type
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`premium-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Terms */}
            <motion.p
              className="text-xs text-white/40 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="auth-link text-xs">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="auth-link text-xs">Privacy Policy</Link>
            </motion.p>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Footer */}
          <motion.div
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
