# 🍽️ Food Donation Management Platform

A full-stack web application designed to connect **restaurants**, **charities**, and **admins** to efficiently manage surplus food donations.  
The platform reduces food waste, helps charities collect food, and provides detailed dashboards for every role.

---

## 🌐 Live Project
[Live Demo Link](https://foodlinkbd.netlify.app/)

---

## 🛠️ Technologies Used
### Frontend:
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- TanStack Query
- React Hook Form
- Swiper.js
- Recharts
- Mapbox

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe API
- JWT Authentication

### Others:
- Firebase Authentication (Email/Password + Google Login)
- Cloud Image Upload (if used)

---

## ✨ Core Features
### 1. **Public Pages**
- **Home Page** with:
  - Navbar (public + private routes)
  - Swiper.js slider
  - Featured Donations
  - Latest Charity Requests
  - Impact Stats
  - Community Stories
  - Footer (About, Contact, Social Media)
- **404 Page** for invalid routes

### 2. **Authentication**
- Email/Password login & registration
- Google Sign-In (Firebase)
- JWT token stored in `localStorage`
- Logout clears session

### 3. **Private Routes by Role**
- **User Dashboard**: Favorites, Reviews, Charity Role Request (with Stripe payment)
- **Restaurant Dashboard**: Add Donation, Manage Donations, View Requests
- **Charity Dashboard**: Request Donations, Manage Pickups, Reviews
- **Admin Dashboard**: Verify Donations, Manage Users, Manage Role Requests, Feature Donations

### 4. **Donation Management**
- View all verified donations
- Search by location
- Sort by quantity or pickup time
- Request, Save, Review donations
- Stripe Payment for Charity Role Request
- Axios interceptor for token refresh

### 5. **Extra Features**
- Mapbox integration for donation locations
- Recharts donation statistics for restaurants
- Report Donation functionality
- Responsive & mobile-friendly design

---

## 📦 Dependencies
### Frontend:
```bash
react, react-dom, react-router-dom
tailwindcss, daisyui
axios
@tanstack/react-query
react-hook-form
swiper
recharts
mapbox-gl
firebase
jsonwebtoken
