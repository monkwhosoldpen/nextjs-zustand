import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = "",
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700';
      case 'outline':
        return 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      default:
        return 'bg-gray-900 hover:bg-gray-800 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2.5 py-1.5';
      case 'lg':
        return 'text-base px-6 py-3';
      case 'icon':
        return 'h-10 w-10 p-0';
      default:
        return 'text-sm px-4 py-2';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors 
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 
                 disabled:opacity-50 disabled:pointer-events-none ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 