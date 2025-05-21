import React, { useState } from 'react';
import { ThumbsUp, User, Star, ChevronDown } from 'lucide-react';
import useReviews from '../hooks/useReviews';
import StarRating from './ui/StarRating';
import Button from './ui/Button';

interface ReviewSectionProps {
  restaurantId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ restaurantId }) => {
  const { 
    reviews, 
    isLoading, 
    error, 
    sortBy, 
    setSortBy, 
    addReview, 
    calculateAverageRating, 
    markAsHelpful
  } = useReviews({ restaurantId });
  
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    isAnonymous: false,
    userName: '',
  });
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as any);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setNewReview({
        ...newReview,
        [name]: target.checked,
      });
    } else {
      setNewReview({
        ...newReview,
        [name]: value,
      });
    }
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview({
      ...newReview,
      rating,
    });
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newReview.comment.trim()) {
      alert('Please enter a review comment');
      return;
    }
    
    if (!newReview.isAnonymous && !newReview.userName.trim()) {
      alert('Please enter your name or check "Post anonymously"');
      return;
    }
    
    // Add review
    addReview({
      restaurantId,
      userName: newReview.isAnonymous ? '' : newReview.userName,
      isAnonymous: newReview.isAnonymous,
      rating: newReview.rating,
      comment: newReview.comment,
    });
    
    // Reset form
    setNewReview({
      rating: 5,
      comment: '',
      isAnonymous: false,
      userName: '',
    });
    
    // Close form
    setIsWritingReview(false);
  };
  
  const renderReviewForm = () => {
    return (
      <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Write a Review</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <StarRating 
            rating={newReview.rating} 
            interactive={true} 
            onChange={handleRatingChange} 
            size="lg"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Share your experience at this restaurant..."
            required
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label 
              htmlFor="userName" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={newReview.userName}
              onChange={handleInputChange}
              disabled={newReview.isAnonymous}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="John Doe"
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={newReview.isAnonymous}
                onChange={handleInputChange as any}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Post anonymously</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => setIsWritingReview(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </div>
      </form>
    );
  };
  
  if (isLoading) {
    return (
      <div className="py-4 flex justify-center">
        <div className="w-8 h-8 border-2 border-t-green-500 border-green-200 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Reviews ({reviews.length})</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0">
          {!isWritingReview && (
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsWritingReview(true)}
            >
              Write a Review
            </Button>
          )}
          
          <div className="flex items-center">
            <label htmlFor="sort-reviews" className="text-sm text-gray-600 mr-2">
              Sort by:
            </label>
            <select
              id="sort-reviews"
              value={sortBy}
              onChange={handleSortChange}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      </div>
      
      {isWritingReview && renderReviewForm()}
      
      {reviews.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-3">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {review.isAnonymous ? 'Anonymous User' : review.userName}
                    </div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              
              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              <button
                onClick={() => markAsHelpful(review.id)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <ThumbsUp size={14} className="mr-1" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;