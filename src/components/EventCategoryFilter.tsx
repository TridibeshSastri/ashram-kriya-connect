
import { useState } from 'react';

interface EventCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const EventCategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: EventCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
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
  );
};

export default EventCategoryFilter;
