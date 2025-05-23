
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isDevotee, isMentor, userData, signOut } = useAuth();
  
  // Check for admin status from localStorage
  useEffect(() => {
    try {
      const adminUser = localStorage.getItem('adminUser');
      const isAdminUser = adminUser ? JSON.parse(adminUser).isAdmin : false;
      setIsAdmin(isAdminUser);
    } catch (error) {
      setIsAdmin(false);
    }
  }, [location.pathname]); // Re-check on route change
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Kriyayoga', path: '/kriyayoga' },
    { name: 'Events', path: '/events' },
    { name: 'Social Service', path: '/social-service' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (isAdmin) return '/admin-dashboard';
    if (isMentor) return '/mentor-dashboard';
    if (isDevotee) return '/devotee-dashboard';
    return '/auth';
  };

  // Role-specific links
  const dashboardLink = (isAuthenticated || isAdmin) ? [
    { name: 'My Dashboard', path: getDashboardPath() }
  ] : [];

  // Authentication link
  const authLink = isAuthenticated || isAdmin
    ? { name: isAdmin ? 'Admin' : (userData?.fullName || 'Account'), path: getDashboardPath() }
    : { name: 'Login / Register', path: '/auth' };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // All navigation links combined
  const allLinks = [...navLinks, ...dashboardLink];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      localStorage.removeItem('adminUser');
      setIsAdmin(false);
      navigate('/');
      window.location.reload();
    } else {
      signOut();
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png"
            alt="ASKSMS Logo"
            className="h-12 w-12"
          />
          <span className="text-xl md:text-2xl font-playfair font-bold text-maroon">
            ASKSMS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
          {allLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm lg:text-base transition-colors ${
                isActive(link.path)
                  ? 'text-saffron font-medium'
                  : 'text-foreground hover:text-saffron'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated || isAdmin ? (
            <div className="flex items-center gap-2">
              <div className="text-sm lg:text-base px-3 py-2">
                Hello, {isAdmin ? 'Admin' : (userData?.fullName?.split(' ')[0] || 'User')}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm lg:text-base px-3 py-2 text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={authLink.path}
              className={`px-3 py-2 rounded-md text-sm lg:text-base transition-colors ${
                isActive(authLink.path)
                  ? 'text-saffron font-medium'
                  : 'text-foreground hover:text-saffron'
              }`}
            >
              {authLink.name}
            </Link>
          )}
          
          <Link 
            to="/donate"
            className="ml-1 bg-saffron hover:bg-saffron/90 text-white px-4 py-2 rounded-md text-sm lg:text-base transition-colors"
          >
            Donate
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-2">
            {allLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-accent text-saffron font-medium'
                    : 'text-foreground hover:bg-accent/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated || isAdmin ? (
              <>
                <div className="px-4 py-2 font-medium">
                  Hello, {isAdmin ? 'Admin' : (userData?.fullName?.split(' ')[0] || 'User')}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-600 hover:bg-accent/50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={authLink.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(authLink.path)
                    ? 'bg-accent text-saffron font-medium'
                    : 'text-foreground hover:bg-accent/50'
                }`}
              >
                {authLink.name}
              </Link>
            )}
            
            <Link 
              to="/donate"
              className="bg-saffron hover:bg-saffron/90 text-white px-4 py-2 rounded-md text-center transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
