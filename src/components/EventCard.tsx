
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  location: string;
  description: string;
  link?: string;
}

const EventCard = ({ title, date, image, location, description, link }: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white shadow-md text-maroon px-3 py-1.5 rounded-md font-medium text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-saffron" />
            {date}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-maroon mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{location}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{description}</p>
        
        {link && (
          <Link 
            to={link}
            className="inline-flex items-center text-saffron hover:text-maroon text-sm font-medium transition-colors gap-1"
          >
            Learn More
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
