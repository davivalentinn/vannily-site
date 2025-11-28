import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'danger' | 'success' | 'favorited';
    active?: boolean;
    children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
    variant = 'default',
    active = false,
    children,
    className,
    ...props
}) => {
    const baseStyles = 'p-3 rounded-lg border-2 transition-all';

    const variants = {
        default: active
            ? 'bg-gray-50 border-gray-500 text-gray-700'
            : 'bg-white border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-700',
        danger: active
            ? 'bg-red-50 border-red-500 text-red-500'
            : 'bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500',
        success: active
            ? 'bg-emerald-50 border-emerald-500 text-emerald-500'
            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-500',
        favorited: active
            ? 'bg-white border-gray-300 text-button'
            : 'bg-white border-gray-300 text-gray-600 hover:border-button hover:text-button'
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;