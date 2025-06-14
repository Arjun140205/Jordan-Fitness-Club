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
      className="fixed w-full top-0 left-0 right-0 z-50 flex justify-center mt-8"
    >
      <div className="bg-white rounded-full shadow-md px-8 py-3">
        <div className="flex items-center justify-center gap-4">
          <ul className="flex items-center gap-2">
            <li>
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-black hover:text-white transition-all"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link 
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-black hover:text-white transition-all"
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-black hover:text-white transition-all"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all"
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
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all"
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
