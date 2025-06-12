import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { ThemeProvider } from './components/ThemeProvider'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageTransition key="home">
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <PageTransition key="user-dashboard">
              <UserDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PageTransition key="admin-dashboard">
              <AdminDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition key="login">
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition key="register">
              <Register />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster 
            position="top-center"
            expand={false}
            richColors
            closeButton
            theme="system"
          />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
