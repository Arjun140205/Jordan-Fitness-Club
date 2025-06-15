import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 left-0 right-0 z-50 flex justify-center mt-8 px-4 md:px-0"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 px-4 md:px-8 py-3 relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`flex items-center justify-center ${isMenuOpen ? 'flex-col absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md mt-2 rounded-2xl p-4 border border-white/20' : 'hidden md:flex'} md:flex-row md:relative md:bg-transparent md:p-0 md:border-0`}>
          <ul className={`flex items-center ${isMenuOpen ? 'flex-col space-y-2' : 'flex-row space-x-2'}`}>
            <li className={isMenuOpen ? 'w-full' : ''}>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out block text-center"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li className={isMenuOpen ? 'w-full' : ''}>
                <Link 
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out block text-center"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li className={isMenuOpen ? 'w-full' : ''}>
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out block text-center"
                  >
                    Login
                  </Link>
                </li>
                <li className={isMenuOpen ? 'w-full' : ''}>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#fce51d] to-[#fec62c] text-gray-900 rounded-full hover:shadow-[0_0_15px_rgba(254,198,44,0.5)] hover:scale-105 transition-all duration-300 ease-out font-semibold block text-center"
                  >
                    Join Now
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className={isMenuOpen ? 'w-full' : ''}>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#fce51d] to-[#fec62c] text-gray-900 rounded-full hover:shadow-[0_0_15px_rgba(254,198,44,0.5)] hover:scale-105 transition-all duration-300 ease-out font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
