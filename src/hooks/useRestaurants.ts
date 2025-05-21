import { useState, useEffect } from 'react';
import { Restaurant, FilterOptions, SearchLocation } from '../types';
import { restaurants as mockRestaurants } from '../data/mockData';

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    isPureVegetarian: false,
    isSatvik: false,
    minRating: 0,
    maxDistance: null,
    cuisine: null,
  });
  
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(null);

  // Fetch restaurants (mock for now)
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Calculate distances if search location is set
        let restaurantsWithDistance = [...mockRestaurants];
        if (searchLocation) {
          restaurantsWithDistance = calculateDistances(restaurantsWithDistance, searchLocation.coordinates);
        }
        
        setRestaurants(restaurantsWithDistance);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchLocation]);

  // Apply filters whenever filterOptions or restaurants change
  useEffect(() => {
    if (restaurants.length > 0) {
      let filtered = [...restaurants];
      
      // Apply search query filter
      if (filterOptions.searchQuery) {
        const query = filterOptions.searchQuery.toLowerCase();
        filtered = filtered.filter(
          restaurant => 
            restaurant.name.toLowerCase().includes(query) || 
            restaurant.description.toLowerCase().includes(query) ||
            restaurant.cuisine.some(type => type.toLowerCase().includes(query))
        );
      }
      
      // Apply dietary filters
      if (filterOptions.isPureVegetarian) {
        filtered = filtered.filter(restaurant => restaurant.isPureVegetarian);
      }
      
      if (filterOptions.isSatvik) {
        filtered = filtered.filter(restaurant => restaurant.isSatvik);
      }
      
      // Apply rating filter
      if (filterOptions.minRating > 0) {
        filtered = filtered.filter(restaurant => restaurant.rating >= filterOptions.minRating);
      }
      
      // Apply distance filter
      if (filterOptions.maxDistance && searchLocation) {
        filtered = filtered.filter(
          restaurant => restaurant.distance && restaurant.distance <= filterOptions.maxDistance!
        );
      }
      
      // Apply cuisine filter
      if (filterOptions.cuisine && filterOptions.cuisine !== 'All') {
        filtered = filtered.filter(
          restaurant => restaurant.cuisine.includes(filterOptions.cuisine!)
        );
      }
      
      setFilteredRestaurants(filtered);
    }
  }, [filterOptions, restaurants]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Helper function to calculate distances
  const calculateDistances = (restaurants: Restaurant[], userCoords: { lat: number; lng: number }): Restaurant[] => {
    return restaurants.map(restaurant => {
      const distance = getDistance(
        userCoords.lat,
        userCoords.lng,
        restaurant.coordinates.lat,
        restaurant.coordinates.lng
      );
      
      return {
        ...restaurant,
        distance,
      };
    });
  };

  // Haversine formula to calculate distance between two coordinates
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  // Toggle favorite status
  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(restaurantId)) {
        return prevFavorites.filter(id => id !== restaurantId);
      } else {
        return [...prevFavorites, restaurantId];
      }
    });
  };

  // Check if restaurant is favorite
  const isFavorite = (restaurantId: string) => {
    return favorites.includes(restaurantId);
  };

  return {
    restaurants: filteredRestaurants,
    allRestaurants: restaurants,
    isLoading,
    error,
    filterOptions,
    setFilterOptions,
    searchLocation,
    setSearchLocation,
    favorites,
    toggleFavorite,
    isFavorite,
  };
};

export default useRestaurants;