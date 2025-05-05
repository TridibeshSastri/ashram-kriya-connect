
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import About from './pages/About';
import Kriyayoga from './pages/Kriyayoga';
import Events from './pages/Events';
import Resources from './pages/Resources';
import SocialService from './pages/SocialService';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import CourseDetail from './pages/CourseDetail';
import Courses from './pages/Courses';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import Unauthorized from './pages/Unauthorized';
import DevoteeDashboard from './pages/DevoteeDashboard';
import MentorDashboard from './pages/MentorDashboard';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import CourseCreation from './pages/CourseCreation';
import CourseEdit from './pages/CourseEdit';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/sonner";
import './App.css';

function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return <></>;

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/kriyayoga" element={<Kriyayoga />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/courses" element={<Courses />} />
          <Route path="/resources/courses/:courseId" element={<CourseDetail />} />
          <Route path="/social-service" element={<SocialService />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Role-based Protected Routes */}
          <Route path="/devotee-dashboard" element={
            <ProtectedRoute requiredRoles={['devotee']}>
              <DevoteeDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/mentor-dashboard" element={
            <ProtectedRoute requiredRoles={['mentor']}>
              <MentorDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          } />
          
          <Route path="/course-creation" element={
            <ProtectedRoute requiredRoles={['admin', 'mentor']}>
              <CourseCreation />
            </ProtectedRoute>
          } />
          
          <Route path="/course-edit/:courseId" element={
            <ProtectedRoute requiredRoles={['admin', 'mentor']}>
              <CourseEdit />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
