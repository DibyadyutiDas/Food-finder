import React from 'react';
import Button from './ui/Button';

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] mb-8">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
          Find <span className="text-green-400">Pure Vegetarian</span> &<br />
          <span className="text-green-400">Satvik</span> Restaurants
        </h1>
        
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8 animate-fadeIn animation-delay-200">
          Discover restaurants that align with your dietary preferences. 
          Whether you're looking for 100% vegetarian or No Onion-Garlic options, we've got you covered.
        </p>
        
        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fadeIn animation-delay-600">
          <StatItem value="500+" label="Restaurants" />
          <StatItem value="50+" label="Cities" />
          <StatItem value="100%" label="Vegetarian" />
          <StatItem value="20k+" label="Happy Users" />
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="h-16 w-full fill-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-green-300">{label}</div>
    </div>
  );
};

export default Hero;