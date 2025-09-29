import type { CarouselSlide } from './types';

export const slides: CarouselSlide[] = [
  {
    id: 1,
    image: '/carousel/image.png',  // ← Caminho a partir de public/
    alt: 'Slide 1',
    link: '#'
  },
  {
    id: 2,
    image: '/carousel/image-2.png',
    alt: 'Slide 2',
    link: '#'
  },
  {
    id: 3,
    image: '/carousel/image-3.png',
    alt: 'Slide 3',
    link: '#'
  },
  {
    id: 4,
    image: '/carousel/image-4.png',
    alt: 'Slide 4',
    link: '#'
  },
  {
    id: 5,
    image: '/carousel/image-5.png',
    alt: 'Slide 5',
    link: '#'
  }
];

export const carouselConfig = {
  autoplayInterval: 2000,
  transitionDuration: 500
};