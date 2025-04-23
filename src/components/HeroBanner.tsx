
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-maroon/90 to-maroon h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/ashram-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center md:text-left">
        <div className="max-w-3xl md:ml-0 mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
            <span className="block text-saffron">Aukhanda Shri</span> 
            Kriyayog Sadhan Mandir Sevashram
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in">
            A sacred sanctuary dedicated to the teachings of Kriyayoga, spiritual awakening,
            and selfless service to humanity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fade-in">
            <Link 
              to="/kriyayoga" 
              className="btn-primary"
            >
              Learn Kriyayoga
            </Link>
            <Link 
              to="/events" 
              className="btn-outline text-white border-white hover:bg-white/10"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative curved shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L60,64C120,64,240,64,360,69.3C480,75,600,85,720,80C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
