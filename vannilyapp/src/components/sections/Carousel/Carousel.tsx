import React, { useState, useEffect, useRef } from 'react';
import { slides, carouselConfig } from './carouselData';
import { CarouselSlideComponent } from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';
import { useCarousel } from './useCarousel';


export const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Distância mínima de swipe (em px)
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };
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
      ref={containerRef}
      className="relative w-full overflow-hidden touch-pan-y"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Container dos slides */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        {slides.map((slide, index) => (
          <CarouselSlideComponent
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
      </div>

      {/* Controles de navegação - Ocultos no mobile */}
      <div className="hidden md:block">
        <CarouselControls 
          onPrevious={prevSlide}
          onNext={nextSlide}
        />
      </div>

      {/* Indicadores */}
      <CarouselIndicators
        total={slides.length}
        current={currentSlide}
        onSelect={goToSlide}
      />
    </div>
  );
};