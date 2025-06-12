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
      className="fixed w-full top-0 left-0 right-0 z-50 bg-[var(--primary-color)] shadow-lg"
    >
      <div className="max-w-[var(--max-width)] mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="nav-logo max-w-[150px]">
          <img src={logo} alt="Jordan Fitness Club" className="h-12" />
        </Link>

        <ul className="nav-links hidden md:flex items-center gap-12">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link 
                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="btn-primary py-2 px-6"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn-primary py-2 px-6">
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
