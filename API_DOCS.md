# 🔗 Jordan Fitness Club - API Documentation

Base URL: `https://jordan-fitness-club.onrender.com` (Production)  
Local: `http://localhost:5001`

---

## 📋 Table of Contents
- [Authentication](#-authentication)
- [User Routes](#-user-routes)
- [Admin Routes](#-admin-routes)
- [Error Responses](#-error-responses)

---

## 🔐 Authentication

All protected routes require:
```
Authorization: Bearer <token>
```

---

### POST `/api/auth/register`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "9876543210"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64abc123def456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "9876543210"
  }
}
```

**Error Responses:**
- `400` - Missing fields or email exists
- `500` - Server error

---

### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64abc123def456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "9876543210"
  }
}
```

**Error Responses:**
- `400` - Invalid credentials
- `404` - User not found

---

### GET `/api/auth/validate`
Validate JWT token and get user data.

🔒 **Requires Authentication**

**Success Response (200):**
```json
{
  "_id": "64abc123def456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "9876543210",
  "feeStatus": "Pending"
}
```

---

### POST `/api/auth/forgot-password`
Request password reset code.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Reset code sent to your email"
}
```

---

### POST `/api/auth/reset-password`
Reset password with code.

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "newsecurepassword"
}
```

**Success Response (200):**
```json
{
  "message": "Password reset successful"
}
```

---

## 👤 User Routes

All routes require authentication.

---

### GET `/api/user/dashboard`
Get user's dashboard data.

🔒 **Requires Authentication**

**Success Response (200):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "currentPlan": "1-Month Trial Plan",
  "planEndDate": "2025-02-12T00:00:00.000Z",
  "feeStatus": "Pending",
  "membershipId": "64abc123def456",
  "joinedOn": "2025-01-12T00:00:00.000Z",
  "upcomingPlans": [
    "One Month Flex Plan",
    "HIIT + Diet Combo",
    "Annual Discount Package"
  ],
  "stats": {
    "daysActive": 15,
    "workoutsCompleted": 0,
    "averageRating": 4.5
  }
}
```

---

### POST `/api/user/razorpay-order`
Create Razorpay payment order.

🔒 **Requires Authentication**

**Request Body:**
```json
{
  "amount": 199900,
  "currency": "INR",
  "receipt": "receipt_1234"
}
```

> Note: Amount is in paise (199900 = ₹1999)

**Success Response (200):**
```json
{
  "order": {
    "id": "order_LKJhg7654...",
    "amount": 199900,
    "currency": "INR",
    "status": "created"
  }
}
```

---

### POST `/api/user/razorpay-verify`
Verify Razorpay payment signature.

🔒 **Requires Authentication**

**Request Body:**
```json
{
  "razorpay_order_id": "order_LKJhg7654...",
  "razorpay_payment_id": "pay_AbCd1234...",
  "razorpay_signature": "abc123def456..."
}
```

**Success Response (200):**
```json
{
  "message": "Payment verified and status updated"
}
```

---

## 🛡️ Admin Routes

All routes require authentication + admin role.

---

### GET `/api/admin/dashboard`
Get admin dashboard with all users and stats.

🔒 **Requires Admin**

**Success Response (200):**
```json
{
  "stats": {
    "totalUsers": 50,
    "pendingPayments": 12,
    "activePlans": 38,
    "totalRevenue": "₹0"
  },
  "users": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "plan": "Basic",
      "status": "Pending",
      "joinDate": "2025-01-12",
      "planEndDate": "2025-02-12"
    }
  ]
}
```

---

### POST `/api/admin/notify-payments`
Send fee reminders to users with pending payments.

🔒 **Requires Admin**

**Success Response (200):**
```json
{
  "message": "Notifications sent",
  "results": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "emailStatus": "Sent",
      "smsStatus": "Sent"
    }
  ]
}
```

---

### GET `/api/admin/notification-logs`
Get recent notification history.

🔒 **Requires Admin**

**Success Response (200):**
```json
{
  "logs": [
    {
      "_id": "64log123...",
      "userId": "64abc123...",
      "notificationType": "Fee Reminder",
      "emailStatus": "Sent",
      "smsStatus": "Sent",
      "message": "Fee reminder sent for due date 2025-02-12",
      "createdAt": "2025-01-12T10:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/admin/add-user`
Add a new user (admin only).

🔒 **Requires Admin**

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "user"
}
```

---

### POST `/api/admin/add-plan`
Add a new membership plan.

🔒 **Requires Admin**

**Request Body:**
```json
{
  "name": "Premium Annual",
  "duration": 12,
  "price": 15999,
  "features": ["All equipment access", "Personal trainer", "Diet plan"]
}
```

---

## ❌ Error Responses

### Standard Error Format
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## 🧪 Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","phone":"1234567890"}'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Dashboard (with token):**
```bash
curl http://localhost:5001/api/user/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 Health Check

### GET `/api/health`
```json
{
  "status": "ok",
  "mongodb": "connected"
}
```

### GET `/debug/routes`
Lists all registered API routes (development only).
