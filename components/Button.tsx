import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md border-b-4";
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-yellow-600",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border-gray-200",
    danger: "bg-red-500 hover:bg-red-400 text-white border-red-700",
    success: "bg-green-500 hover:bg-green-400 text-white border-green-700",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};