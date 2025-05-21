import React from 'react';
import { MapPin, Clock, ExternalLink, Leaf, Heart } from 'lucide-react';
import { Restaurant } from '../types';
import StarRating from './ui/StarRating';
import Badge from './ui/Badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  isFavorite,
  onToggleFavorite,
}) => {
  const { 
    id, 
    name, 
    description, 
    address, 
    isPureVegetarian, 
    isSatvik, 
    rating, 
    reviewCount, 
    cuisine, 
    distance, 
    photos, 
    priceLevel 
  } = restaurant;

  const getPriceSymbol = (level: number) => {
    return Array(level).fill('$').join('');
  };

  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1 group"
    >
      {/* Restaurant Image */}
      <div 
        className="relative h-48 cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img
          src={photos[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => onToggleFavorite(e, id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isFavorite 
                ? 'bg-white text-red-500' 
                : 'bg-white/80 text-gray-400 hover:text-red-500'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
        </div>
        
        {/* Distance Badge (if available) */}
        {distance !== undefined && (
          <div className="absolute bottom-3 right-3 z-10">
            <Badge color="blue" size="sm">
              {distance} km away
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 cursor-pointer" onClick={onClick}>
        {/* Name and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <div className="flex items-center">
            <StarRating rating={rating} size="sm" />
            <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
          </div>
        </div>
        
        {/* Price and Cuisine */}
        <div className="flex items-center mb-3">
          <span className="text-gray-600 text-sm mr-2">{getPriceSymbol(priceLevel)}</span>
          <div className="flex flex-wrap gap-1">
            {cuisine.map((type, index) => (
              <Badge key={index} color="gray" size="sm">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">
          {truncate(description, 100)}
        </p>
        
        {/* Dietary Preferences */}
        <div className="flex items-center mb-3 space-x-2">
          {isPureVegetarian && (
            <Badge color="green" size="sm">
              <Leaf className="w-3 h-3 mr-1" />
              Pure Vegetarian
            </Badge>
          )}
          {isSatvik && (
            <Badge color="purple" size="sm">
              No Onion-Garlic
            </Badge>
          )}
        </div>
        
        {/* Address */}
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;