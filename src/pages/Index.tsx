
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import GuruCard from '../components/GuruCard';
import EventCard from '../components/EventCard';

const Index = () => {
  // Guru lineage data
  const gurus = [
    {
      name: "Mahavatar Babaji",
      image: "/images/babaji.jpg", // Placeholder until real images are provided
      period: "Ageless",
      description: "The immortal master who revived the ancient science of Kriyayoga for the modern age."
    },
    {
      name: "Lahiri Mahasaya",
      image: "/images/lahiri.jpg",
      period: "1828-1895",
      description: "Shyamacharan Lahiri, the first to bring Kriyayoga to householders and people of all backgrounds."
    },
    {
      name: "Yukteswar Giri",
      image: "/images/yukteswar.jpg",
      period: "1855-1936",
      description: "A Jyotisha master and scholar who systematized Kriyayoga teachings for the modern era."
    }
  ];
  
  // Event data
  const events = [
    {
      title: "Kriyayoga Initiation",
      date: "May 15, 2025",
      image: "/images/initiation.jpg",
      location: "Main Temple Hall",
      description: "Sacred initiation ceremony for new seekers guided by our Guruji. Learn the powerful techniques of Kriyayoga meditation.",
      link: "/events/kriyayoga-initiation",
      availableSeats: 35
    },
    {
      title: "Guru Purnima Celebration",
      date: "July 21, 2025",
      image: "/images/guru-purnima.jpg",
      location: "Ashram Grounds",
      description: "Annual celebration honoring the Guru lineage with special pujas, bhajans, and spiritual discourses throughout the day.",
      link: "/events/guru-purnima",
      availableSeats: 120
    },
    {
      title: "Monthly Yajna",
      date: "April 30, 2025",
      image: "/images/yajna.jpg",
      location: "Yajna Shala",
      description: "Sacred fire ceremony for purification and spiritual upliftment, followed by prasad distribution.",
      link: "/events/monthly-yajna",
      availableSeats: 50
    }
  ];
  
  return (
    <main>
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-6">Welcome to Our Spiritual Sanctuary</h2>
              <div className="divider divider-saffron w-24 mb-6">
                <span className="om-symbol">ॐ</span>
              </div>
              <p className="mb-5 text-gray-700">
                Aukhanda Shri Kriyayog Sadhan Mandir Sevashram is a sacred space dedicated to spiritual growth, self-realization, and service to humanity. Founded on the timeless teachings of the Kriyayoga tradition, our ashram serves as a sanctuary for seekers from all walks of life.
              </p>
              <p className="mb-6 text-gray-700">
                Under the guidance of our spiritual leader, Acharya Devananda Sastri, we continue the unbroken lineage of Kriyayoga masters, preserving and sharing the authentic techniques of this powerful spiritual science.
              </p>
              <Link to="/about" className="btn-primary">
                Learn About Our Mission
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/ashram-temple.jpg"
                alt="Ashram Temple"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-5 -left-5 bg-cream p-4 rounded shadow-md w-40 hidden md:block">
                <p className="text-maroon font-playfair font-semibold text-center">
                  Established in 1978
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guru Lineage Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Our Sacred Lineage</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              The unbroken chain of enlightened masters who have preserved and transmitted the sacred science of Kriyayoga through generations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gurus.map((guru, index) => (
              <GuruCard
                key={index}
                name={guru.name}
                image={guru.image}
                period={guru.period}
                description={guru.description}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/about" className="btn-secondary">
              View Complete Lineage
            </Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Upcoming Events</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              Join us for spiritual ceremonies, meditation sessions, and community gatherings at the ashram.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                image={event.image}
                location={event.location}
                description={event.description}
                link={event.link}
                availableSeats={event.availableSeats}
                allowBooking={true}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events" className="btn-secondary">
              View All Events
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-maroon to-maroon/90 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Experience the transformative power of Kriyayoga under the guidance of our experienced teachers. Join our community of dedicated practitioners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/kriyayoga" className="btn-primary">
                Learn About Kriyayoga
              </Link>
              <Link to="/contact" className="bg-white text-maroon hover:bg-white/90 py-2 px-6 rounded-md font-medium transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
