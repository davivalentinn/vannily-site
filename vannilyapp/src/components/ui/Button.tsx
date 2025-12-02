import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'button' | 'secondary' | 'outline' | 'pill' | 'favorite';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'button', 
  size = 'md', 
  children, 
  className,
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    button: 'bg-button text-white hover:bg-button-90 font-montserrat',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 font-montserrat',
    outline: 'bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-montserrat',
    pill: 'bg-bar text-white font-montserrat'
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;