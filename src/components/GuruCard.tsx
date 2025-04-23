
import { useState } from 'react';

interface GuruCardProps {
  name: string;
  image: string;
  period?: string;
  description: string;
}

const GuruCard = ({ name, image, period, description }: GuruCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {period && (
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-white text-sm">{period}</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-maroon mb-2">{name}</h3>
        
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-24'}`}>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
        
        {description.length > 150 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-saffron hover:text-maroon text-sm font-medium transition-colors flex items-center"
          >
            {expanded ? 'Read Less' : 'Read More'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default GuruCard;
