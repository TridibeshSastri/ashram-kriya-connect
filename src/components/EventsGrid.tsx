
import EventCard from './EventCard';

interface Event {
  title: string;
  date: string;
  image: string;
  location: string;
  category: string;
  category2?: string;
  description: string;
  link?: string;
  availableSeats?: number;
}

interface EventsGridProps {
  events: Event[];
}

const EventsGrid = ({ events }: EventsGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.length > 0 ? (
        events.map((event, index) => (
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
  );
};

export default EventsGrid;
