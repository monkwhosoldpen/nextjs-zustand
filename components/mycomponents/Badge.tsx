import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export function Badge({ 
  children, 
  variant = 'default', 
  className = "",
  onClick
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'outline':
        return 'bg-transparent border border-gray-300 text-gray-700';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getVariantStyles()} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
} 