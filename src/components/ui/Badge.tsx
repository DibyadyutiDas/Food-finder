import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'amber' | 'purple' | 'blue' | 'gray';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = 'gray',
  size = 'md'
}) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    purple: 'bg-purple-100 text-purple-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};

export default Badge;