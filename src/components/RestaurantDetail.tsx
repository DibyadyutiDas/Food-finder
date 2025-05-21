import React, { useState } from 'react';
import { Phone, Globe, MapPin, Clock, ArrowLeft, Star, ExternalLink, Leaf, DollarSign, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Restaurant } from '../types';
import Badge from './ui/Badge';
import Button from './ui/Button';
import StarRating from './ui/StarRating';
import ReviewSection from './ReviewSection';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isShowingAllHours, setIsShowingAllHours] = useState(false);

  const {
    name,
    description,
    address,
    phone,
    website,
    hours,
    isPureVegetarian,
    isSatvik,
    rating,
    cuisine,
    photos,
    priceLevel,
    features,
    menuHighlights,
  } = restaurant;

  const getPriceSymbol = (level: number) => {
    return Array(level).fill('$').join('');
  };

  const goToPrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => 
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const goToNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => 
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  const getDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const toggleHoursDisplay = () => {
    setIsShowingAllHours(!isShowingAllHours);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={onToggleFavorite}
            className={`absolute top-4 right-4 z-20 ${
              isFavorite 
                ? 'bg-white text-red-500' 
                : 'bg-white/80 text-gray-600 hover:text-red-500'
            } p-2 rounded-full transition-colors`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>

          {/* Photo gallery */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={photos[activePhotoIndex]}
              alt={name}
              className="w-full h-full object-cover"
            />
            
            {/* Photo navigation */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 py-2">
              <button
                onClick={goToPrevPhoto}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                {activePhotoIndex + 1} / {photos.length}
              </div>
              
              <button
                onClick={goToNextPhoto}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Restaurant header info */}
            <div className="mb-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                <div className="flex items-center">
                  <StarRating rating={rating} size="md" />
                  <span className="ml-2 text-gray-600">{rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-gray-600">{getPriceSymbol(priceLevel)}</span>
                {cuisine.map((type, index) => (
                  <Badge key={index} color="gray">
                    {type}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {isPureVegetarian && (
                  <Badge color="green">
                    <Leaf className="w-4 h-4 mr-1" />
                    Pure Vegetarian
                  </Badge>
                )}
                {isSatvik && (
                  <Badge color="purple">
                    No Onion-Garlic (Satvik)
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600">{description}</p>
            </div>

            {/* Contact and Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact info */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact & Location</h2>
                
                <div className="flex">
                  <MapPin className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{address}</span>
                </div>
                
                <div className="flex">
                  <Phone className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                  <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
                    {phone}
                  </a>
                </div>
                
                <div className="flex">
                  <Globe className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Hours</h2>
                
                <div className="mb-2">
                  <div className="flex items-center text-sm font-medium">
                    <Clock className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-green-700">Today ({getDayName()}):</span>
                    <span className="ml-2 text-gray-700">{hours[getDayName()]}</span>
                  </div>
                </div>
                
                {isShowingAllHours ? (
                  <div className="space-y-1">
                    {Object.entries(hours).map(([day, time]) => 
                      day !== getDayName() && (
                        <div key={day} className="flex text-sm">
                          <span className="w-24 text-gray-600">{day}:</span>
                          <span className="text-gray-700">{time}</span>
                        </div>
                      )
                    )}
                    <button
                      onClick={toggleHoursDisplay}
                      className="text-sm text-green-600 hover:text-green-800 mt-1"
                    >
                      Show less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggleHoursDisplay}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    View all hours
                  </button>
                )}
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Amenities & Features</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge key={index} color="blue">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Menu Highlights */}
            {menuHighlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Menu Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuHighlights.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 border border-gray-200 rounded-lg relative"
                    >
                      {item.isPopular && (
                        <div className="absolute -top-2 -right-2">
                          <Badge color="amber" size="sm">
                            <Star className="w-3 h-3 mr-1 fill-amber-500" />
                            Popular
                          </Badge>
                        </div>
                      )}
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-800">{item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ReviewSection restaurantId={restaurant.id} />

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                variant="primary"
                leftIcon={<MapPin size={16} />}
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')}
              >
                Get Directions
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Phone size={16} />}
                onClick={() => window.open(`tel:${phone}`, '_blank')}
              >
                Call
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Globe size={16} />}
                onClick={() => window.open(website, '_blank')}
              >
                Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;