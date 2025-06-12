export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const endpoints = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },
  user: {
    dashboard: `${API_URL}/user/dashboard`,
    profile: `${API_URL}/user/profile`,
  },
};
