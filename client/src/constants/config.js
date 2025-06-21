// Use environment variable or default to localhost:5001 (macOS AirPlay uses 5000)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const endpoints = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    validate: `${API_URL}/auth/validate`,
    logout: `${API_URL}/auth/logout`,
  },
  user: {
    dashboard: `${API_URL}/user/dashboard`,
    profile: `${API_URL}/user/profile`,
  },
  admin: {
    dashboard: `${API_URL}/admin/dashboard`,
    users: `${API_URL}/admin/users`,
    payments: `${API_URL}/admin/payments`,
    plans: `${API_URL}/admin/plans`,
    logs: `${API_URL}/admin/notification-logs`,
    notify: `${API_URL}/admin/notify`,
    notifyPayments: `${API_URL}/admin/notify-payments`,
    notifications: `${API_URL}/admin/notifications`,
  },
};
