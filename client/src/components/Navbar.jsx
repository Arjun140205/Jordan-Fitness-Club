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
      className="max-w-[var(--max-width)] mx-auto px-4 py-8 flex items-center justify-between gap-8"
    >
      <Link to="/" className="nav-logo max-w-[150px]">
        <img src={logo} alt="Jordan Fitness Club" />
      </Link>

      <ul className="nav-links hidden md:flex items-center gap-12">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/programs" className="nav-link">Program</Link></li>
        <li><Link to="/services" className="nav-link">Service</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/community" className="nav-link">Community</Link></li>
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link 
              to={user?.role === 'admin' ? '/admin' : '/dashboard'}
              className="nav-link"
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          </>
        ) : (
          <Link to="/register" className="btn-primary">
            Join Now
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
