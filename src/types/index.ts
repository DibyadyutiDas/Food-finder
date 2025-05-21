export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  hours: {
    [key: string]: string;
  };
  isPureVegetarian: boolean;
  isSatvik: boolean; // No onion, no garlic
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3; // $ to $$$
  cuisine: string[];
  distance?: number; // in km
  photos: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[]; // e.g., "Outdoor Seating", "Delivery", etc.
  menuHighlights: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface FilterOptions {
  searchQuery: string;
  isPureVegetarian: boolean;
  isSatvik: boolean;
  minRating: number;
  maxDistance: number | null;
  cuisine: string | null;
}

export interface SearchLocation {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}