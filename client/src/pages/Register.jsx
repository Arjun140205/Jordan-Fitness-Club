import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Dumbbell } from "lucide-react";
import { useState } from "react";
import { endpoints } from "../constants/config";
import "../styles/auth.css";

const schema = yup.object({
  name: yup.string().required("Required").min(2, "Min 2 characters"),
  email: yup.string().email("Invalid email").required("Required"),
  phone: yup.string().required("Required").matches(/^[0-9]{10}$/, "10 digits required"),
  password: yup.string().required("Required").min(6, "Min 6 characters"),
  role: yup.string().oneOf(['user', 'admin']).default('user'),
}).required();

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
      toast.success("Account created");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="designer-auth">
      {/* Background Typography Art */}
      <div className="designer-auth-typography top">JOIN</div>
      <div className="designer-auth-typography bottom">NOW</div>

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

        <motion.h1
          className="designer-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Register
        </motion.h1>
        <motion.p
          className="designer-subheading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Create your account
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <motion.div
            className="designer-input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              {...register("name")}
              className={`designer-input ${errors.name ? 'error' : ''}`}
              placeholder="Name"
              autoComplete="name"
            />
            <label className="designer-label">Full Name</label>
            <div className="designer-input-line" />
            {errors.name && <p className="designer-error">{errors.name.message}</p>}
          </motion.div>

          {/* Email */}
          <motion.div
            className="designer-input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
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

          {/* Phone */}
          <motion.div
            className="designer-input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="designer-phone-wrapper">
              <span className="designer-phone-prefix">+91</span>
              <input
                type="tel"
                {...register("phone")}
                className={`designer-input ${errors.phone ? 'error' : ''}`}
                placeholder="Phone"
                autoComplete="tel"
                maxLength={10}
              />
            </div>
            <label className="designer-label" style={{ left: '3rem' }}>Phone</label>
            {errors.phone && <p className="designer-error">{errors.phone.message}</p>}
          </motion.div>

          {/* Password */}
          <motion.div
            className="designer-input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password")}
              className={`designer-input ${errors.password ? 'error' : ''}`}
              placeholder="Password"
              autoComplete="new-password"
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

          {/* Password Strength */}
          {password && (
            <motion.div
              className="designer-strength"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="designer-strength-bars">
                <div className={`designer-strength-bar ${passwordChecks.length ? 'active' : ''}`} />
                <div className={`designer-strength-bar ${passwordChecks.hasLetter ? 'active' : ''}`} />
                <div className={`designer-strength-bar ${passwordChecks.hasNumber ? 'active' : ''}`} />
              </div>
              <div className="designer-strength-text">
                <span className={`designer-strength-item ${passwordChecks.length ? 'active' : ''}`}>6+ chars</span>
                <span className={`designer-strength-item ${passwordChecks.hasLetter ? 'active' : ''}`}>Letter</span>
                <span className={`designer-strength-item ${passwordChecks.hasNumber ? 'active' : ''}`}>Number</span>
              </div>
            </motion.div>
          )}

          {/* Role */}
          <motion.div
            className="designer-input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <select {...register("role")} className="designer-select">
              <option value="user">Member</option>
              <option value="admin">Admin</option>
            </select>
            <label className="designer-label" style={{ top: '-0.5rem', fontSize: '0.65rem', color: 'var(--secondary-color)' }}>
              Account Type
            </label>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="designer-button"
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <span className="designer-spinner" />
                Creating
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>

          {/* Terms */}
          <motion.p
            className="designer-footer"
            style={{ marginTop: '1.5rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            By registering, you agree to our{' '}
            <Link to="/terms" className="designer-link" style={{ fontSize: '0.6rem' }}>Terms</Link>
            {' & '}
            <Link to="/privacy" className="designer-link" style={{ fontSize: '0.6rem' }}>Privacy</Link>
          </motion.p>
        </form>

        <div className="designer-divider">
          <span>or</span>
        </div>

        <motion.div
          className="designer-footer"
          style={{ marginTop: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <span>Have an account? </span>
          <Link to="/login" className="designer-link">Sign In</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
