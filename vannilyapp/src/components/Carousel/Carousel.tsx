import React from 'react';
import { slides, carouselConfig } from './carouselData';
import { CarouselSlideComponent } from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';
import { useCarousel } from './useCarousel';

/**
 * Componente principal do Carousel
 * Banner full-width centralizado
 */
export const Carousel: React.FC = () => {
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    startAutoplay,
    stopAutoplay
  } = useCarousel({
    totalSlides: slides.length,
    autoplayInterval: carouselConfig.autoplayInterval
  });

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Container dos slides */}
      <div className="relative h-[200px] md:h-[300px] lg:h-[400px]">
        {slides.map((slide, index) => (
          <CarouselSlideComponent
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
      </div>

      {/* Controles de navegação */}
      <CarouselControls 
        onPrevious={prevSlide}
        onNext={nextSlide}
      />

      {/* Indicadores */}
      <CarouselIndicators
        total={slides.length}
        current={currentSlide}
        onSelect={goToSlide}
      />
    </div>
  );
};