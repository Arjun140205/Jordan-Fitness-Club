import { Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { LogIn, LogOut, Menu as MenuIcon, UserPlus, Home, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = token
    ? [
        { to: role === "admin" ? "/admin/dashboard" : "/user/dashboard", 
          label: "Dashboard", 
          icon: User 
        }
      ]
    : [
        { to: "/login", label: "Login", icon: LogIn },
        { to: "/register", label: "Register", icon: UserPlus }
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Home className="w-6 h-6" />
            <span>Jordan Fitness Club</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive(link.to)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {link.label}
                </Link>
              );
            })}
            {token && (
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <MenuIcon className="w-6 h-6" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Menu.Item key={link.to}>
                          {({ active }) => (
                            <Link
                              to={link.to}
                              className={`${
                                active || isActive(link.to)
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900 dark:text-gray-100"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                            >
                              <Icon className="w-5 h-5 mr-2" />
                              {link.label}
                            </Link>
                          )}
                        </Menu.Item>
                      );
                    })}
                    {token && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? "bg-blue-500 text-white" : "text-gray-900 dark:text-gray-100"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                          >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
