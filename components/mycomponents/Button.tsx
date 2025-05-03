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
  // Using Tailwind classes directly instead of custom functions
  const variantClasses = {
    default: 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  }[variant];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 rounded-md',
    default: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-md',
    icon: 'h-10 w-10 p-0 rounded-full',
  }[size];

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses}
        ${sizeClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 