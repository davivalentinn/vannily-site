import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { CarouselSlide as CarouselSlideType } from './types';

interface CarouselSlideProps {
  slide: CarouselSlideType;
  isActive: boolean;
}

export const CarouselSlideComponent: React.FC<CarouselSlideProps> = ({ 
  slide, 
  isActive 
}) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {/* Imagem do slide */}
      <img
        src={slide.image}
        alt={slide.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
    </div>
  );
};