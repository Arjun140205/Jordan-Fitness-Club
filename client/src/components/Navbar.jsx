import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

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
      className="fixed w-full top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm"
    >
      <div className="max-w-[var(--max-width)] mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="nav-logo max-w-[150px]">
          <img src={logo} alt="Jordan Fitness Club" className="h-10 brightness-0 invert" />
        </Link>

        <div className="flex items-center">
          <ul className="nav-links hidden md:flex items-center gap-10 mr-10">
            <li>
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link 
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="text-white hover:text-gray-200 font-medium relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="bg-white text-black px-7 py-2.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-gray-200 font-medium relative group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-black px-7 py-2.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
