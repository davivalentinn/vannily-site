
import React from 'react';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

/**
 * Indicadores (bolinhas) do carousel
 */
export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ 
  total, 
  current, 
  onSelect 
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-3 rounded-full transition-all duration-300 ${
            index === current
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/75 w-3'
          }`}
          aria-label={`Ir para slide ${index + 1}`}
          aria-current={index === current}
        />
      ))}
    </div>
  );
};