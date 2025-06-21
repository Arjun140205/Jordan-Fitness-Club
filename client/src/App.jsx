import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Community from './pages/Community'
import Programs from './pages/Programs'
import Services from './pages/Services'
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
        {/* Quick Links Routes */}
        <Route
          path="/about"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <About />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/privacy"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Privacy />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/terms"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Terms />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Contact />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/careers"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Careers />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/community"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Community />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/programs"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Programs />
              </PageTransition>
            </AnimatePresence>
          }
        />
        <Route
          path="/services"
          element={
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Services />
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
