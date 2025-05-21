import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Filter, X } from 'lucide-react';
import { FilterOptions, SearchLocation } from '../types';
import { cuisineTypes } from '../data/mockData';
import Button from './ui/Button';

interface SearchSectionProps {
  filterOptions: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onLocationChange: (location: SearchLocation) => void;
  onSearch: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  filterOptions, 
  onFilterChange, 
  onLocationChange,
  onSearch
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      onFilterChange({
        ...filterOptions,
        [name]: checked,
      });
    } else {
      onFilterChange({
        ...filterOptions,
        [name]: value,
      });
    }
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({
      ...filterOptions,
      minRating: parseInt(value),
    });
  };

  const handleDistanceChange = (value: string) => {
    onFilterChange({
      ...filterOptions,
      maxDistance: value ? parseInt(value) : null,
    });
  };

  const handleCuisineChange = (value: string) => {
    onFilterChange({
      ...filterOptions,
      cuisine: value === 'All' ? null : value,
    });
  };

  const handleAddressSubmit = () => {
    if (!addressInput.trim()) return;
    
    // In a real app, this would use the Google Places API to get coordinates
    // For now, we're just mocking it with random coordinates near the default
    const fakeCoordinates = {
      lat: 34.0522 + (Math.random() * 0.1 - 0.05),
      lng: -118.2437 + (Math.random() * 0.1 - 0.05),
    };
    
    onLocationChange({
      address: addressInput,
      coordinates: fakeCoordinates,
    });
    
    onSearch();
  };

  const clearAllFilters = () => {
    onFilterChange({
      searchQuery: '',
      isPureVegetarian: false,
      isSatvik: false,
      minRating: 0,
      maxDistance: null,
      cuisine: null,
    });
    setAddressInput('');
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 mt-4">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="searchQuery"
            value={filterOptions.searchQuery}
            onChange={handleInputChange}
            placeholder="Search for restaurants, cuisines..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Location Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Enter your location"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="primary"
            onClick={handleAddressSubmit}
            rightIcon={<ArrowRight size={16} />}
          >
            Search
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            aria-label="Toggle filters"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-slideDown">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Filters</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <X size={16} className="mr-1" />
                Clear all
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dietary Preferences */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Dietary Preferences</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPureVegetarian"
                    checked={filterOptions.isPureVegetarian}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Pure Vegetarian</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isSatvik"
                    checked={filterOptions.isSatvik}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">No Onion-Garlic (Satvik)</span>
                </label>
              </div>
            </div>
            
            {/* Rating & Distance */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Rating & Distance</h4>
              
              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Minimum Rating</label>
                <select
                  value={filterOptions.minRating}
                  onChange={(e) => handleRatingChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              
              {/* Distance */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Maximum Distance</label>
                <select
                  value={filterOptions.maxDistance || ''}
                  onChange={(e) => handleDistanceChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Any Distance</option>
                  <option value="1">Within 1 km</option>
                  <option value="3">Within 3 km</option>
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                </select>
              </div>
            </div>
            
            {/* Cuisine Type */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Cuisine Type</h4>
              <select
                value={filterOptions.cuisine || 'All'}
                onChange={(e) => handleCuisineChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;