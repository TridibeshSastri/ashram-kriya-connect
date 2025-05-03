
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
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import DevoteeAuth from './pages/DevoteeAuth';
import DevoteeDashboard from './pages/DevoteeDashboard';
import NotFound from './pages/NotFound';
import CourseCreation from './pages/CourseCreation';
import CourseEdit from './pages/CourseEdit';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { Toaster } from "@/components/ui/sonner";
import './App.css';

function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return <></>;

  return (
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
        <Route path="/devotee-auth" element={<DevoteeAuth />} />
        <Route path="/devotee-dashboard" element={<DevoteeDashboard />} />
        <Route path="/admin-login" element={<AdminAuth />} />
        <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
        <Route path="/course-creation" element={<ProtectedAdminRoute><CourseCreation /></ProtectedAdminRoute>} />
        <Route path="/course-edit/:courseId" element={<ProtectedAdminRoute><CourseEdit /></ProtectedAdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
