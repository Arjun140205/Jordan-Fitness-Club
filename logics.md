# 🧠 Jordan Fitness Club - Architecture & Logic

This document explains the core architecture, data flow, and business logic of the application.

---

## 📊 System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│  Express Server │────▶│    MongoDB      │
│   (Vercel)      │◀────│   (Render)      │◀────│   (Atlas)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       ├── Nodemailer (Gmail)
        │                       ├── Fast2SMS (SMS)
        └── Razorpay SDK        └── Razorpay (Payments)
```

---

## 🔐 Authentication Flow

### Registration
1. User submits: `name`, `email`, `password`, `phone`
2. Server validates all fields are present
3. Check if email already exists
4. Hash password with `bcrypt` (10 rounds)
5. Create user with default role: `user`
6. Generate JWT token (7-day expiry)
7. Return token + user data

### Login
1. User submits: `email`, `password`
2. Find user by email
3. Compare password with bcrypt
4. Generate JWT with `{id, role}` payload
5. Client stores token in `localStorage`

### Token Validation
- Middleware extracts `Bearer` token from headers
- Verifies token with `JWT_SECRET`
- Fetches full user from DB
- Attaches `req.user` for route handlers

---

## 👤 User Model

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| name | String | required | - |
| email | String | required, unique | - |
| password | String | required | Hashed |
| phone | String | required | For SMS |
| role | Enum | `user` | `user` or `admin` |
| currentPlan | String | `Basic` | Active plan name |
| planEndDate | Date | +1 month | Auto-calculated |
| feeStatus | Enum | `Pending` | `Paid` or `Pending` |
| resetCode | String | - | Password reset |

---

## 💳 Payment Flow (Razorpay)

```
1. Client requests     /api/user/razorpay-order
                              │
2. Server creates      Razorpay.orders.create()
                              │
3. Client opens        Razorpay Checkout Modal
                              │
4. On success, sends   razorpay_order_id,
                       razorpay_payment_id,
                       razorpay_signature
                              │
5. Server verifies     HMAC-SHA256 signature
                              │
6. Updates user        feeStatus = "Paid"
                              │
7. Logs to             NotificationLog collection
```

---

## 📧 Notification System

### Fee Reminder Flow
1. Admin triggers `/api/admin/notify-payments`
2. Query all users where `feeStatus = "Pending"`
3. For each user:
   - Send email via Nodemailer (Gmail SMTP)
   - Send SMS via Fast2SMS API
   - Log result to `NotificationLog`

### Email Configuration
```javascript
transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});
```

> **Note:** Use Gmail App Password, not regular password

---

## 🛡️ Route Protection

### User Routes
```javascript
authMiddleware  →  Validates JWT  →  Attaches req.user
```

### Admin Routes
```javascript
authMiddleware  →  Check req.user.role === "admin"
```

### Protected Client Routes
```jsx
<ProtectedRoute>       // Checks isAuthenticated
  <UserDashboard />
</ProtectedRoute>

<ProtectedRoute adminOnly={true}>  // Also checks role
  <AdminDashboard />
</ProtectedRoute>
```

---

## 🎨 Frontend State Management

### AuthContext
```
┌─────────────────────────────────────┐
│           AuthProvider              │
│  ┌───────────────────────────────┐  │
│  │  user: object | null          │  │
│  │  isAuthenticated: boolean     │  │
│  │  loading: boolean             │  │
│  │  login(): void                │  │
│  │  logout(): void               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Theme Management
- `ThemeProvider` wraps app
- Persists to `localStorage`
- CSS variables switch colors

---

## 📱 Key Client Pages

| Page | Route | Auth Required |
|------|-------|---------------|
| Home | `/` | No |
| Login | `/login` | No |
| Register | `/register` | No |
| User Dashboard | `/dashboard` | Yes |
| Admin Dashboard | `/admin` | Yes (admin) |
| About | `/about` | No |
| Programs | `/programs` | No |

---

## 🗄️ Database Collections

### Users
Stores all registered users with membership data.

### Plans
```javascript
{
  name: "Monthly Premium",
  duration: 1,        // months
  price: 1999,        // INR
  features: ["Access to all equipment", "Personal trainer"]
}
```

### NotificationLogs
Tracks all sent notifications for audit.
```javascript
{
  userId: ObjectId,
  status: "Success" | "Failed",
  type: "Email" | "SMS" | "Both",
  message: "Fee reminder sent...",
  createdAt: Date
}
```

---

## 🔄 API Request Flow

```
Client                    Server
  │                          │
  ├── axios.get/post() ─────▶│
  │   + Authorization header │
  │                          ├── authMiddleware
  │                          ├── Controller logic
  │                          ├── MongoDB query
  │◀───── JSON response ─────┤
  │                          │
```

---

## ⚡ Performance Optimizations

1. **AOS** - Animate On Scroll (one-time init)
2. **Framer Motion** - Smooth page transitions
3. **React Router** - Client-side routing
4. **Lazy loading** - Component-level code splitting
5. **Vite** - Fast HMR and build times
