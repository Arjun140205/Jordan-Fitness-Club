import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../constants/config';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('token');
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      
      if (token && rememberMe) {
        await validateToken(token);
      } else if (token) {
        // If token exists but remember me is false, only validate if token is not expired
        const tokenExp = getTokenExpiration(token);
        if (tokenExp && tokenExp > Date.now()) {
          await validateToken(token);
        } else {
          handleLogout();
        }
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const getTokenExpiration = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
      return null;
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await axios.get(`${endpoints.auth.validate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    const userInfo = userData.user || { role: userData.role };
    setUser(userInfo);
    setIsAuthenticated(true);

    // Update last login time
    localStorage.setItem('lastLogin', new Date().toISOString());
    
    // Set session data
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('role', userInfo.role);
    }

    console.log("Logged in as:", userInfo.role); // Debug log
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    
    // Only remove email if remember me is not enabled
    if (localStorage.getItem('rememberMe') !== 'true') {
      localStorage.removeItem('email');
    }
    
    localStorage.removeItem('role');
  };

  const contextValue = {
    user,
    loading,
    isAuthenticated,
    login,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
