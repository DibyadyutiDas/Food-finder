import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const getStarSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  const handleClick = (selectedRating: number) => {
    if (interactive && onChange) {
      onChange(selectedRating);
    }
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (interactive) {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            className={`${getStarSize()} ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            } transition-colors duration-200 mr-0.5`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${starValue} of ${maxRating} stars`}
            disabled={!interactive}
          >
            <Star
              className={`${getStarSize()} ${
                filled
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-300'
              } transition-colors duration-200`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;