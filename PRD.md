# 📋 Product Requirements Document (PRD)

## Jordan Fitness Club - Gym Management Platform

**Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Product Team

---

## 1. Executive Summary

Jordan Fitness Club is a modern web-based gym membership management platform designed to streamline member enrollment, payment tracking, and communication between gym administrators and members.

### 1.1 Problem Statement
Traditional gym management relies on manual record-keeping, leading to:
- Missed payment reminders
- Inefficient member tracking
- Poor member engagement
- No centralized dashboard for admins

### 1.2 Solution
A full-stack web application providing:
- Self-service member registration
- Automated payment reminders
- Integrated online payments
- Real-time admin dashboard

---

## 2. Target Users

### Primary Users

| User Type | Description | Key Needs |
|-----------|-------------|-----------|
| **Gym Members** | Individuals with gym memberships | View membership status, make payments |
| **Gym Admin** | Staff managing memberships | Track payments, send reminders, manage users |

### User Personas

**Member: Rahul, 28**
- Works full-time, exercises evenings
- Wants to quickly check membership status
- Prefers paying online over cash

**Admin: Priya, 35**
- Manages 100+ gym members
- Needs at-a-glance view of pending payments
- Wants to send bulk reminders efficiently

---

## 3. Features & Requirements

### 3.1 Authentication System

| Requirement | Priority | Status |
|-------------|----------|--------|
| User registration with email/phone | P0 | ✅ Done |
| Secure login with JWT tokens | P0 | ✅ Done |
| Password reset via email | P1 | ✅ Done |
| Remember me functionality | P2 | ✅ Done |
| Role-based access (user/admin) | P0 | ✅ Done |

### 3.2 Member Dashboard

| Requirement | Priority | Status |
|-------------|----------|--------|
| View current plan details | P0 | ✅ Done |
| See plan expiry date | P0 | ✅ Done |
| Check payment status | P0 | ✅ Done |
| Make online payment | P0 | ✅ Done |
| View upcoming plans | P2 | ✅ Done |

### 3.3 Admin Dashboard

| Requirement | Priority | Status |
|-------------|----------|--------|
| View all members list | P0 | ✅ Done |
| Filter by payment status | P1 | ✅ Done |
| Send bulk reminders | P0 | ✅ Done |
| View notification history | P1 | ✅ Done |
| Add new members manually | P1 | ✅ Done |
| Create membership plans | P1 | ✅ Done |

### 3.4 Payment System

| Requirement | Priority | Status |
|-------------|----------|--------|
| Razorpay integration | P0 | ✅ Done |
| Secure payment verification | P0 | ✅ Done |
| Auto-update fee status | P0 | ✅ Done |
| Payment logging | P1 | ✅ Done |

### 3.5 Notification System

| Requirement | Priority | Status |
|-------------|----------|--------|
| Email notifications | P0 | ✅ Done |
| SMS notifications | P1 | ✅ Done |
| Notification logs | P1 | ✅ Done |

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load time < 3 seconds
- API response time < 500ms
- Support 1000+ concurrent users

### 4.2 Security
- All passwords hashed with bcrypt
- JWT token expiry: 7 days
- HTTPS only in production
- CORS restricted to allowed origins

### 4.3 Usability
- Mobile-responsive design
- Dark/light mode support
- Smooth animations and transitions
- Intuitive navigation

### 4.4 Reliability
- 99.9% uptime target
- Graceful error handling
- MongoDB connection retry logic

---

## 5. Technical Architecture

### 5.1 Frontend Stack
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, AOS
- **State:** React Context API
- **Routing:** React Router v7

### 5.2 Backend Stack
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT
- **Email:** Nodemailer (Gmail SMTP)
- **SMS:** Fast2SMS API
- **Payments:** Razorpay

### 5.3 Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 6. User Flows

### 6.1 Member Registration
```
Landing Page → Register → Fill Form → Email Verification → Dashboard
```

### 6.2 Member Payment
```
Dashboard → Select Plan → Razorpay Checkout → Payment Success → Status Updated
```

### 6.3 Admin Fee Reminder
```
Admin Dashboard → View Pending → Send Reminders → Email + SMS Sent → Logs Updated
```

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| User Registration Rate | 50/month | New signups |
| Payment Completion | 80% | Pending → Paid |
| Admin Efficiency | 50% time saved | Reminder automation |
| User Satisfaction | 4.5/5 rating | Feedback surveys |

---

## 8. Future Roadmap

### Phase 2 (Q2 2025)
- [ ] Multiple gym locations support
- [ ] Workout tracking & logs
- [ ] QR code check-in system
- [ ] Mobile app (React Native)

### Phase 3 (Q3 2025)
- [ ] Diet plan recommendations
- [ ] Progress photos feature
- [ ] Group class bookings
- [ ] Revenue analytics dashboard

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Payment gateway downtime | High | Add backup gateway |
| Email deliverability issues | Medium | Use dedicated SMTP service |
| Database overload | High | Implement caching layer |
| Security breach | Critical | Regular security audits |

---

## 10. Appendix

### 10.1 Glossary
- **JWT:** JSON Web Token for authentication
- **SMTP:** Simple Mail Transfer Protocol
- **ODM:** Object Document Mapper (Mongoose)

### 10.2 Related Documents
- [README.md](./README.md) - Project setup guide
- [logics.md](./logics.md) - Technical architecture
- [API_DOCS.md](./API_DOCS.md) - API reference

---

*This PRD is a living document and will be updated as the product evolves.*
