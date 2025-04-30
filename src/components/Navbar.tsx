
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
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

  // Check if devotee is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const devoteeUser = localStorage.getItem('devoteeUser');
      if (devoteeUser) {
        try {
          const user = JSON.parse(devoteeUser);
          setIsLoggedIn(!!user.isAuthenticated);
        } catch (e) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    
    // Listen for storage changes (in case of login/logout)
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Kriyayoga', path: '/kriyayoga' },
    { name: 'Events', path: '/events' },
    { name: 'Social Service', path: '/social-service' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const devoteeLink = isLoggedIn 
    ? { name: 'My Dashboard', path: '/devotee-dashboard' }
    : { name: 'Devotee Login', path: '/devotee-auth' };

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
        <div className="hidden md:flex space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
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
          <Link
            to={devoteeLink.path}
            className={`px-3 py-2 rounded-md text-sm lg:text-base transition-colors ${
              isActive(devoteeLink.path)
                ? 'text-saffron font-medium'
                : 'text-foreground hover:text-saffron'
            }`}
          >
            {devoteeLink.name}
          </Link>
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
            {navLinks.map((link) => (
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
            <Link
              to={devoteeLink.path}
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive(devoteeLink.path)
                  ? 'bg-accent text-saffron font-medium'
                  : 'text-foreground hover:bg-accent/50'
              }`}
            >
              {devoteeLink.name}
            </Link>
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
