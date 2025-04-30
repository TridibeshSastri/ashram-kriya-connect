
import { Link, useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <footer className="bg-cream pt-12 pb-6 border-t border-saffron/20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ashram Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-maroon mb-4">
              Aukhanda Shri
            </h3>
            <p className="text-sm mb-4 text-gray-700">
              Dedicated to the spiritual teachings of Kriyayoga and serving humanity through the path of self-realization and selfless service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-saffron hover:text-maroon transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-saffron hover:text-maroon transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-saffron hover:text-maroon transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-maroon mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-700 hover:text-saffron transition-colors">About Us</Link></li>
              <li><Link to="/kriyayoga" className="text-gray-700 hover:text-saffron transition-colors">Kriyayoga</Link></li>
              <li><Link to="/events" className="text-gray-700 hover:text-saffron transition-colors">Events & Programmes</Link></li>
              <li><Link to="/social-service" className="text-gray-700 hover:text-saffron transition-colors">Social Service</Link></li>
              <li><Link to="/resources" className="text-gray-700 hover:text-saffron transition-colors">Resources</Link></li>
              <li><Link to="/donate" className="text-gray-700 hover:text-saffron transition-colors">Donate</Link></li>
              {isHomePage && (
                <li><Link to="/admin-auth" className="text-gray-700 hover:text-saffron transition-colors">Admin Login</Link></li>
              )}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-maroon mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-saffron flex-shrink-0 mt-0.5" />
                <span>Aukhanda Shri Kriyayog Sadhan Mandir Sevashram<br />123 Spiritual Path, Ashram District<br />Kolkata, West Bengal 700001, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-saffron flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-saffron flex-shrink-0" />
                <a href="mailto:info@aukhandashriaashram.org" className="hover:text-saffron transition-colors">
                  info@aukhandashriaashram.org
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-maroon mb-4">Newsletter</h3>
            <p className="text-sm mb-4 text-gray-700">
              Subscribe to receive updates about upcoming events and spiritual teachings.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                required
              />
              <button
                type="submit"
                className="w-full bg-saffron hover:bg-saffron/90 text-white py-2 px-4 rounded-md text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>© {currentYear} Aukhanda Shri Kriyayog Sadhan Mandir Sevashram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
