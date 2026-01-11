<p align="center">
  <img src="client/public/logo.svg" alt="Jordan Fitness Club Logo" width="120" height="120"/>
</p>

<h1 align="center">🏋️ Jordan Fitness Club</h1>

<p align="center">
  <strong>A modern, full-stack gym membership management platform</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-documentation">API</a> •
  <a href="#-project-structure">Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-8.15-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | JWT-based secure login/register with password reset via email |
| 👤 **User Dashboard** | Personal membership info, plan status, and payment tracking |
| 🛡️ **Admin Panel** | Complete member management with fee notifications |
| 💳 **Razorpay Integration** | Secure online payment processing |
| 📧 **Notifications** | Automated email + SMS reminders for pending fees |
| 🌓 **Dark/Light Mode** | Theme toggle with smooth transitions |
| 🎨 **Modern UI** | Framer Motion animations, AOS scroll effects |

---

## 🛠️ Tech Stack

### Frontend
```
React 19       │ UI Framework
Vite           │ Build Tool
Tailwind CSS   │ Styling
Framer Motion  │ Animations
React Router   │ Navigation
Axios          │ API Requests
Sonner         │ Toast Notifications
```

### Backend
```
Express 5      │ Server Framework
MongoDB        │ Database
Mongoose       │ ODM
JWT            │ Authentication
Bcrypt         │ Password Hashing
Nodemailer     │ Email Service
Razorpay       │ Payment Gateway
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas or local instance
- Razorpay account (for payments)

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/jordan-fitness-club.git
cd jordan-fitness-club

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Environment Setup

**Server (`/server/.env`)**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Client (`/client/.env`)**
```env
VITE_API_URL=http://localhost:5001
```

### 3. Run Development Servers

```bash
# Terminal 1 - Start backend
cd server && npm run dev

# Terminal 2 - Start frontend
cd client && npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5001 |

---

## 📚 API Documentation

See [API_DOCS.md](./API_DOCS.md) for complete endpoint documentation.

### Quick Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create new user |
| `/api/auth/login` | POST | User login |
| `/api/user/dashboard` | GET | Get user dashboard data |
| `/api/admin/dashboard` | GET | Get admin stats & user list |
| `/api/user/razorpay-order` | POST | Create payment order |

---

## 📁 Project Structure

```
jordan-fitness-club/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth context provider
│   │   ├── constants/      # API config
│   │   └── styles/         # CSS files
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
│
└── README.md
```

---

## 🔑 User Roles

| Role | Access |
|------|--------|
| **User** | Personal dashboard, payments |
| **Admin** | All user data, notifications, plan management |

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://jordan-fitness-club.vercel.app) |
| Backend | [Render](https://jordan-fitness-club.onrender.com) |

---

## 📄 Additional Documentation

- 📋 [Product Requirements (PRD.md)](./PRD.md)
- 🧠 [Architecture & Logic (logics.md)](./logics.md)
- 🔗 [API Documentation (API_DOCS.md)](./API_DOCS.md)

---

<p align="center">
  Made with ❤️ for Jordan Fitness Club
</p>
