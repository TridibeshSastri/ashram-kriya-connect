
import { useState } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
  // Event categories for filtering
  const categories = ['All', 'Initiations', 'Yajnas', 'Festivals', 'Kumbhabhiṣeka', 'Monthly'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Event data
  const events = [
    {
      title: "Kriyayoga Initiation",
      date: "May 15, 2025",
      image: "/images/initiation.jpg",
      location: "Main Temple Hall",
      category: "Initiations",
      description: "Sacred initiation ceremony for new seekers guided by our Guruji. Learn the powerful techniques of Kriyayoga meditation.",
      link: "/events/kriyayoga-initiation",
      availableSeats: 35
    },
    {
      title: "Guru Pūrṇimā Celebration",
      date: "July 21, 2025",
      image: "/images/guru-purnima.jpg",
      location: "Ashram Grounds",
      category: "Festivals",
      description: "Annual celebration honoring the Guru lineage with special pujas, bhajans, and spiritual discourses throughout the day.",
      link: "/events/guru-purnima",
      availableSeats: 120
    },
    {
      title: "Monthly Yajna",
      date: "April 30, 2025",
      image: "/images/yajna.jpg",
      location: "Yajna Shala",
      category: "Yajnas",
      category2: "Monthly",
      description: "Sacred fire ceremony for purification and spiritual upliftment, followed by prasad distribution.",
      link: "/events/monthly-yajna",
      availableSeats: 50
    },
    {
      title: "Janmāṣṭamī Celebration",
      date: "August 15, 2025",
      image: "/images/janmashtami.jpg",
      location: "Krishna Temple",
      category: "Festivals",
      description: "Celebrate the divine birth of Lord Krishna with all-night bhajans, readings from the Bhagavad Gita, and special prasad.",
      link: "/events/janmashtami",
      availableSeats: 80
    },
    {
      title: "Advanced Kriyayoga Retreat",
      date: "June 1-7, 2025",
      image: "/images/retreat.jpg",
      location: "Meditation Hall & Grounds",
      category: "Initiations",
      description: "A week-long intensive retreat for initiated Kriyayoga practitioners to deepen their practice under Guruji's guidance.",
      link: "/events/advanced-retreat",
      availableSeats: 25
    },
    {
      title: "Monthly Kumbhabhiṣeka",
      date: "May 1, 2025",
      image: "/images/kumbhabhisheka.jpg",
      location: "Main Temple",
      category: "Kumbhabhiṣeka",
      category2: "Monthly",
      description: "Sacred ritual of bathing the temple deities with sanctified water, milk, honey, and other auspicious substances.",
      link: "/events/kumbhabhisheka-may",
      availableSeats: 40
    },
    {
      title: "Kali Pūjā",
      date: "October 31, 2025",
      image: "/images/kali-puja.jpg",
      location: "Kali Temple",
      category: "Festivals",
      description: "Special night-long worship of Divine Mother Kali, representing the cosmic power of transformation.",
      link: "/events/kali-puja",
      availableSeats: 60
    },
    {
      title: "Monthly Spiritual Discourse",
      date: "May 10, 2025",
      image: "/images/discourse.jpg",
      location: "Lecture Hall",
      category: "Monthly",
      description: "Guruji shares wisdom from sacred texts and answers spiritual questions from devotees and seekers.",
      link: "/events/may-discourse",
      availableSeats: 75
    },
    {
      title: "Annual Yajna for World Peace",
      date: "September 21, 2025",
      image: "/images/world-peace-yajna.jpg",
      location: "Main Yajna Shala",
      category: "Yajnas",
      description: "A grand ceremonial fire ritual performed for universal harmony and peace, with participation from all devotees.",
      link: "/events/world-peace-yajna",
      availableSeats: 100
    }
  ];
  
  // Filter events based on active category
  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(event => event.category === activeCategory || event.category2 === activeCategory);
  
  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4">Events & Programmes</h1>
          <div className="divider w-1/2 max-w-md mx-auto">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Join us for spiritual gatherings, ceremonies, and community events throughout the year.
          </p>
        </div>
      </section>
      
      {/* Events Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-saffron text-white'
                    : 'bg-cream text-gray-700 hover:bg-saffron/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-600">No events found in this category. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Annual Programme Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Annual Programme</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              Our ashram follows a traditional calendar of spiritual events throughout the year. Mark these important dates for 2025.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-8">
              {/* January-March */}
              <div>
                <h3 className="font-bold text-xl text-maroon mb-4">January - March</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">January 14</div>
                    <div>Makar Sankranti Celebration & Khichdi Distribution</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">February 18</div>
                    <div>Maha Shivaratri - All Night Vigil & Meditation</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">March 1-7</div>
                    <div>Spring Kriyayoga Initiation Week</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">March 25</div>
                    <div>Holi Celebrations with Spiritual Music</div>
                  </div>
                </div>
              </div>
              
              {/* April-June */}
              <div>
                <h3 className="font-bold text-xl text-maroon mb-4">April - June</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">April 14</div>
                    <div>Bengali New Year Celebrations</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">May 15-21</div>
                    <div>Summer Kriyayoga Retreat</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">June 1</div>
                    <div>Anniversary of Ashram Foundation</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">June 21</div>
                    <div>International Yoga Day - Special Sessions</div>
                  </div>
                </div>
              </div>
              
              {/* July-September */}
              <div>
                <h3 className="font-bold text-xl text-maroon mb-4">July - September</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">July 21</div>
                    <div>Guru Pūrṇimā Celebration</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">August 15</div>
                    <div>Janmāṣṭamī - Lord Krishna's Birthday</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">September 9</div>
                    <div>Ganesh Chaturthi Celebrations</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">September 21</div>
                    <div>Annual World Peace Yajna</div>
                  </div>
                </div>
              </div>
              
              {/* October-December */}
              <div>
                <h3 className="font-bold text-xl text-maroon mb-4">October - December</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">October 12</div>
                    <div>Navarātri Celebrations Begin</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">October 31</div>
                    <div>Kali Pūjā</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">November 12</div>
                    <div>Diwali Celebrations & Meditation for Inner Light</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium text-saffron">December 24-31</div>
                    <div>Year-End Spiritual Retreat & New Year's Eve Meditation</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 italic">
                <span className="font-medium">Note:</span> Dates may vary slightly based on astronomical calculations. Monthly events like Kumbhabhiṣeka and Yajna are conducted on the first Sunday and last Sunday of each month respectively.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;
