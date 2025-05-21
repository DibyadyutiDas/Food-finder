import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import { ChevronUp } from 'lucide-react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  onRestaurantClick: (restaurant: Restaurant) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  emptyMessage?: string;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  isLoading,
  error,
  onRestaurantClick,
  isFavorite,
  toggleFavorite,
  emptyMessage = "No restaurants found. Try adjusting your filters."
}) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Finding the best vegetarian restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg inline-block">
          <p>{error}</p>
          <button className="mt-2 text-sm font-medium text-red-600 hover:text-red-800">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onRestaurantClick(restaurant)}
            isFavorite={isFavorite(restaurant.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg transition-opacity hover:bg-green-700 z-20"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default RestaurantList;