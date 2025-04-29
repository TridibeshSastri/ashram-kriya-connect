
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import EventCategoryFilter from '../components/EventCategoryFilter';
import EventsGrid from '../components/EventsGrid';
import AnnualProgramme from '../components/AnnualProgramme';
import { getEvents, getEventCategories } from '../services/eventService';

const Events = () => {
  // Event categories for filtering
  const categories = getEventCategories();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Event data
  const events = getEvents();
  
  // Filter events based on active category
  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(event => event.category === activeCategory || event.category2 === activeCategory);
  
  return (
    <main>
      {/* Page Header */}
      <PageHeader 
        title="Events & Programmes"
        description="Join us for spiritual gatherings, ceremonies, and community events throughout the year."
      />
      
      {/* Events Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Category Filters */}
          <EventCategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          {/* Events Grid */}
          <EventsGrid events={filteredEvents} />
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
          
          <AnnualProgramme />
        </div>
      </section>
    </main>
  );
};

export default Events;
