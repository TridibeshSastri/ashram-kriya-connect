
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import About from "./pages/About";
import Kriyayoga from "./pages/Kriyayoga";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import SocialService from "./pages/SocialService";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";
import DevoteeAuth from "./pages/DevoteeAuth";
import DevoteeDashboard from "./pages/DevoteeDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/kriyayoga" element={<Kriyayoga />} />
              <Route path="/events" element={<Events />} />
              <Route path="/social-service" element={<SocialService />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/devotee-auth" element={<DevoteeAuth />} />
              <Route path="/devotee-dashboard" element={<DevoteeDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
