import React from 'react';

export const LoadingAnimation = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 min-h-[300px]">
            {/* Spinner circular */}
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            
            {/* Texto animado */}
            <p className="text-gray-700 font-semibold text-lg">
                Carregando produtos
                <span className="inline-flex ml-1">
                    <span className="animate-[bounce_1s_infinite_0ms]">.</span>
                    <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                    <span className="animate-[bounce_1s_infinite_400ms]">.</span>
                </span>
            </p>
        </div>
    );
};

export default LoadingAnimation;