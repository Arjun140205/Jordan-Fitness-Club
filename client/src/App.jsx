import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
import CornerLogo from './components/CornerLogo'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <CornerLogo />
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Home />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/admin"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Login />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Register />
              </PageTransition>
            </AnimatePresence>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
