import { useState, useEffect } from 'react';
import { Review } from '../types';
import { reviews as mockReviews } from '../data/mockData';

type SortOption = 'latest' | 'highest' | 'lowest' | 'helpful';

interface UseReviewsProps {
  restaurantId?: string;
}

const useReviews = ({ restaurantId }: UseReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  
  // Fetch reviews for a specific restaurant
  useEffect(() => {
    const fetchReviews = async () => {
      if (!restaurantId) return;
      
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter mock reviews by restaurant ID
        const filteredReviews = mockReviews.filter(
          review => review.restaurantId === restaurantId
        );
        
        setReviews(filteredReviews);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  // Apply sorting whenever sort option or reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      let sortedReviews = [...reviews];
      
      switch (sortBy) {
        case 'latest':
          sortedReviews.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case 'highest':
          sortedReviews.sort((a, b) => b.rating - a.rating);
          break;
        case 'lowest':
          sortedReviews.sort((a, b) => a.rating - b.rating);
          break;
        case 'helpful':
          sortedReviews.sort((a, b) => b.helpful - a.helpful);
          break;
        default:
          break;
      }
      
      setReviews(sortedReviews);
    }
  }, [sortBy]);

  // Add a new review
  const addReview = (newReview: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const reviewToAdd: Review = {
      ...newReview,
      id: `temp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    
    // Add to local state
    setReviews(prevReviews => [reviewToAdd, ...prevReviews]);
    
    // In a real app, this would send data to the backend
    return reviewToAdd;
  };

  // Calculate average rating
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  // Mark review as helpful
  const markAsHelpful = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
    
    // In a real app, this would update the backend
  };

  return {
    reviews,
    isLoading,
    error,
    sortBy,
    setSortBy,
    addReview,
    calculateAverageRating,
    markAsHelpful,
  };
};

export default useReviews;