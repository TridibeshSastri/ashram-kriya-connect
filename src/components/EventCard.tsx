
import { useState } from 'react';
import { Calendar, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BookingDialog from './BookingDialog';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  location: string;
  description: string;
  link?: string;
  availableSeats?: number;
  allowBooking?: boolean;
}

const EventCard = ({ 
  title, 
  date, 
  image, 
  location, 
  description, 
  link,
  availableSeats = 50,
  allowBooking = true
}: EventCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-saffron text-white px-3 py-1.5 rounded-md font-medium text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-white" />
            {date}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-maroon mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{location}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Ticket size={16} className="text-saffron" />
            <span className="text-sm text-gray-700">{availableSeats} seats available</span>
          </div>
          
          <div className="flex items-center gap-2">
            {link && (
              <Link 
                to={link}
                className="inline-flex items-center text-saffron hover:text-maroon text-sm font-medium transition-colors gap-1"
              >
                Details
              </Link>
            )}
            
            {allowBooking && (
              <Button 
                variant="outline" 
                className="border-saffron text-saffron hover:bg-saffron hover:text-white"
                onClick={() => setIsBookingOpen(true)}
              >
                Book Seats
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {allowBooking && (
        <BookingDialog
          open={isBookingOpen}
          onOpenChange={setIsBookingOpen}
          eventTitle={title}
          eventDate={date}
          availableSeats={availableSeats}
        />
      )}
    </div>
  );
};

export default EventCard;
