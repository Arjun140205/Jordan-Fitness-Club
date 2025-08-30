import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
}).required();

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: code+new pass
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(endpoints.auth.login, data);
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", data.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
      }

      // Store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      
      await login(res.data); // Update auth context
      
      toast.success("Welcome back!");
      
      // Redirect with a smooth transition
      setTimeout(() => {
        const userRole = res.data.user?.role || res.data.role;
        console.log("User role:", userRole); // Debug log
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Forgot password handlers
  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email: forgotEmail });
      toast.success("Reset code sent to your email");
      setForgotStep(2);
    } catch (err) {
      if (err.response?.status === 404) {
        setForgotError("Not a registered email. Please ");
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
      await axios.post(`${API_URL}/auth/reset-password`, {
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div 
        className="fixed inset-0 z-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.242 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23000000' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="glassmorphism p-8 rounded-2xl">
          <div className="flex items-center justify-center mb-8">
            <Dumbbell className="w-8 h-8 text-[var(--secondary-color)] mr-2" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">Welcome Back</h2>
          </div>

          {!showForgot ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                label="Email"
                type="email"
                name="email"
                register={register}
                error={errors.email}
                placeholder="your@email.com"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                register={register}
                error={errors.password}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[var(--secondary-color)] border-gray-300 rounded focus:ring-[var(--secondary-color)]"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <span
                  className="text-sm text-[var(--secondary-color)] hover:text-[var(--secondary-color-dark)] font-medium ml-auto cursor-pointer underline"
                  onClick={() => setShowForgot(true)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={e => { if (e.key === 'Enter') setShowForgot(true); }}
                >
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)]
                         text-white font-semibold rounded-lg transition-all duration-200
                         hover:shadow-lg hover:shadow-[var(--secondary-color)]/20"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={forgotStep === 1 ? handleForgotRequest : handleForgotReset}>
              {forgotStep === 1 && (
                <>
                  <FormInput
                    label="Enter your registered email"
                    type="email"
                    name="forgotEmail"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  {forgotError && (
                    <p className="text-sm text-red-500 mt-1">
                      {forgotError}
                      <Link to="/register" className="text-[var(--secondary-color)] hover:text-[var(--secondary-color-dark)] underline font-medium">Create an account</Link>
                    </p>
                  )}
                </>
              )}
              {forgotStep === 2 && (
                <>
                  <FormInput
                    label="Enter the code sent to your email"
                    type="text"
                    name="forgotCode"
                    value={forgotCode}
                    onChange={e => setForgotCode(e.target.value)}
                    placeholder="6-digit code"
                    required
                  />
                  <FormInput
                    label="New Password"
                    type="password"
                    name="forgotNewPass"
                    value={forgotNewPass}
                    onChange={e => setForgotNewPass(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotStep(1);
                    setForgotEmail("");
                    setForgotCode("");
                    setForgotNewPass("");
                  }}
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] text-white font-semibold rounded-lg transition-all duration-200"
                  disabled={forgotLoading}
                >
                  {forgotStep === 1 ? (forgotLoading ? "Sending..." : "Send Code") : (forgotLoading ? "Resetting..." : "Reset Password")}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-[var(--secondary-color)] hover:text-[var(--secondary-color-dark)] font-medium">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
