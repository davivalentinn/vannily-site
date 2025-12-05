
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
    onPrevious: () => void;
    onNext: () => void;
}

/**
 * Botões de navegação do carousel (anterior/próximo)
 */
export const CarouselControls: React.FC<CarouselControlsProps> = ({
    onPrevious,
    onNext
}) => {
    return (
        <div className="hidden md:block absolute inset-0 max-w-7xl mx-auto px-4 pointer-events-none ">
            {/* Botão Anterior */}
            <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 pointer-events-auto"
                aria-label="Slide anterior"
            >
                <ChevronLeft size={24} className="text-gray-800" />
            </button>

            {/* Botão Próximo */}
            <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 pointer-events-auto"
                aria-label="Próximo slide"
            >
                <ChevronRight size={24} className="text-gray-800" />
            </button>
        </div>
    );
};