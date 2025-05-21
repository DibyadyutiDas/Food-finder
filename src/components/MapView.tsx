import React, { useState, useEffect } from 'react';
import { Restaurant, SearchLocation } from '../types';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  userLocation: SearchLocation | null;
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const MapView: React.FC<MapViewProps> = ({
  restaurants,
  selectedRestaurant,
  userLocation,
  onRestaurantClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would use an actual map API like Google Maps or Mapbox
  // For now, we'll create a simple visual representation of locations

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden h-96 md:h-[500px] bg-gray-100 relative">
      {/* This is a simplified map visualization - in a real app, this would be a Google Map or similar */}
      <div className="absolute inset-0 bg-emerald-50 overflow-hidden">
        {/* Map grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <React.Fragment key={`h-${i}`}>
              <div className="absolute left-0 right-0 border-t border-emerald-100" style={{ top: `${(i + 1) * 12.5}%` }} />
              <div className="absolute top-0 bottom-0 border-l border-emerald-100" style={{ left: `${(i + 1) * 12.5}%` }} />
            </React.Fragment>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-emerald-100"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-emerald-100"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-emerald-100"></div>
        
        {/* Restaurant markers */}
        {restaurants.map(restaurant => {
          const isSelected = selectedRestaurant?.id === restaurant.id;
          const { lat, lng } = restaurant.coordinates;
          
          // Convert lat/lng to relative positions in our container (simplified)
          const top = 100 - ((lat - 33.95) / 0.3) * 100; // Normalize between 0-100%
          const left = ((lng + 118.5) / 0.3) * 100; // Normalize between 0-100%
          
          return (
            <div
              key={restaurant.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                isSelected ? 'z-20' : ''
              }`}
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <button
                onClick={() => onRestaurantClick(restaurant)}
                className={`relative group ${
                  isSelected
                    ? 'scale-125'
                    : 'hover:scale-110'
                }`}
              >
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full 
                  ${isSelected 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : restaurant.isPureVegetarian 
                      ? 'bg-green-500 text-white' 
                      : 'bg-amber-500 text-white'
                  }
                  transform-gpu transition-transform duration-300
                `}>
                  <MapPin className="w-5 h-5" />
                </div>
                
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 min-w-max whitespace-nowrap bg-white rounded-lg shadow-lg p-2 text-xs font-medium border border-gray-200">
                    {restaurant.name}
                    <span className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></span>
                  </div>
                )}
              </button>
            </div>
          );
        })}
        
        {/* User location marker */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
            style={{ 
              top: '50%', // In a real app, this would be calculated from userLocation.coordinates
              left: '50%', 
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg pulse-animation">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white rounded-lg shadow-lg p-2 text-xs font-medium border border-gray-200">
                Your Location
                <span className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow-md p-2 text-xs text-gray-500">
        <p>Map simulation - would integrate with Google Maps in production</p>
      </div>
    </div>
  );
};

export default MapView;