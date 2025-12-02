import { useState, useEffect, useRef } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoplayInterval: number;
}

/**
 * Hook customizado para gerenciar a lógica do carousel
 */
export const useCarousel = ({ totalSlides, autoplayInterval }: UseCarouselProps) => {
  // Estado do slide atual
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Referência para o intervalo do autoplay
  const intervalRef = useRef<number | null>(null);

  // Vai para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Volta para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Vai para um slide específico
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Inicia o autoplay
  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, autoplayInterval);
  };

  // Para o autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Inicia autoplay ao montar o componente
  useEffect(() => {
    startAutoplay();
    
    // Limpa o intervalo ao desmontar
    return () => stopAutoplay();
  }, [currentSlide]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    startAutoplay,
    stopAutoplay
  };
};