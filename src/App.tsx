import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import MapView from './components/MapView';
import useRestaurants from './hooks/useRestaurants';
import { Restaurant } from './types';
import './styles/animations.css';

type Page = 'home' | 'map' | 'favorites' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showRestaurantDetail, setShowRestaurantDetail] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  
  const {
    restaurants,
    allRestaurants,
    isLoading,
    error,
    filterOptions,
    setFilterOptions,
    searchLocation,
    setSearchLocation,
    favorites,
    toggleFavorite,
    isFavorite,
  } = useRestaurants();

  // Reset selections when changing pages
  useEffect(() => {
    setSelectedRestaurant(null);
    setShowRestaurantDetail(false);
    
    if (currentPage === 'map') {
      setShowMapView(true);
    } else {
      setShowMapView(false);
    }
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowRestaurantDetail(true);
  };

  const handleSearch = () => {
    if (currentPage !== 'map') {
      setCurrentPage('map');
    }
  };

  const handleSearchClick = () => {
    // Scroll to search section if on home page
    if (currentPage === 'home') {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPage('map');
    }
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  // Filter restaurants for favorites page
  const favoriteRestaurants = allRestaurants.filter(restaurant => 
    favorites.includes(restaurant.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onSearchClick={handleSearchClick} />
            
            <div id="search-section" className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Restaurant</h2>
              
              <SearchSection
                filterOptions={filterOptions}
                onFilterChange={setFilterOptions}
                onLocationChange={setSearchLocation}
                onSearch={handleSearch}
              />
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Vegetarian Restaurants</h2>
                
                <RestaurantList
                  restaurants={restaurants.slice(0, 6)}
                  isLoading={isLoading}
                  error={error}
                  onRestaurantClick={handleRestaurantClick}
                  isFavorite={isFavorite}
                  toggleFavorite={handleToggleFavorite}
                  emptyMessage="Try searching for restaurants by location or preferences."
                />
              </div>
            </div>
          </>
        )}
        
        {currentPage === 'map' && (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Restaurants Near You</h1>
            
            <SearchSection
              filterOptions={filterOptions}
              onFilterChange={setFilterOptions}
              onLocationChange={setSearchLocation}
              onSearch={handleSearch}
            />
            
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RestaurantList
                  restaurants={restaurants}
                  isLoading={isLoading}
                  error={error}
                  onRestaurantClick={handleRestaurantClick}
                  isFavorite={isFavorite}
                  toggleFavorite={handleToggleFavorite}
                />
              </div>
              
              <div className="order-first lg:order-last mb-6 lg:mb-0">
                <MapView
                  restaurants={restaurants}
                  selectedRestaurant={selectedRestaurant}
                  userLocation={searchLocation}
                  onRestaurantClick={handleRestaurantClick}
                />
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'favorites' && (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Favorite Restaurants</h1>
            
            <RestaurantList
              restaurants={favoriteRestaurants}
              isLoading={false}
              error={null}
              onRestaurantClick={handleRestaurantClick}
              isFavorite={isFavorite}
              toggleFavorite={handleToggleFavorite}
              emptyMessage="You haven't added any restaurants to your favorites yet."
            />
          </div>
        )}
        
        {currentPage === 'about' && (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Food Finder</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <p className="text-gray-700 mb-4">
                Food Finder is dedicated to helping people find restaurants that align with their dietary 
                preferences, specifically focusing on pure vegetarian and Satvik (no onion, no garlic) options.
              </p>
              
              <p className="text-gray-700 mb-4">
                Our mission is to make it easier for vegetarians and those following Satvik diets to discover 
                great dining options without having to worry about their dietary restrictions.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What are Satvik foods?</h2>
              <p className="text-gray-700 mb-4">
                Satvik or Sattvic food is a diet based on foods that contain Sattva quality (pure essence).
                In Ayurveda and Yoga, Satvik foods are considered to be "pure" foods that increase energy,
                happiness, calmness, and mental clarity. These diets typically exclude onions, garlic, and
                other foods considered to be stimulating or rajasic.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Our Features</h2>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                <li>Advanced filters for dietary preferences (Pure Vegetarian, Satvik)</li>
                <li>Location-based restaurant discovery</li>
                <li>Detailed restaurant information including menus and reviews</li>
                <li>Save your favorite restaurants for easy access</li>
                <li>Contribute by reviewing restaurants and sharing your experiences</li>
              </ul>
              
              <p className="text-gray-700 mt-6">
                Food Finder is currently in its early stages, and we're continuously working to improve 
                our platform and expand our restaurant database. If you have any suggestions or feedback,
                please don't hesitate to reach out to us.
              </p>
            </div>
          </div>
        )}
      </main>
      
      {showRestaurantDetail && selectedRestaurant && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onClose={() => setShowRestaurantDetail(false)}
          isFavorite={isFavorite(selectedRestaurant.id)}
          onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;