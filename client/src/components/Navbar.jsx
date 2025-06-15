import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 left-0 right-0 z-50 flex justify-center mt-8 px-4"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-center">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link 
                to="/" 
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link 
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/90 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-out"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-[#fce51d] to-[#fec62c] text-gray-900 rounded-full hover:shadow-[0_0_15px_rgba(254,198,44,0.5)] hover:scale-105 transition-all duration-300 ease-out font-semibold"
                  >
                    Join Now
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-[#fce51d] to-[#fec62c] text-gray-900 rounded-full hover:shadow-[0_0_15px_rgba(254,198,44,0.5)] hover:scale-105 transition-all duration-300 ease-out font-semibold"
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
