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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzQQUigIVuuFKJNBJqRyseW3axZ7XYivtEw&s',
    alt: 'Slide 2',
    link: '#'
  },
  {
    id: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BTS_during_a_White_House_press_conference_May_31%2C_2022_%28cropped%29.jpg',
    alt: 'Slide 3',
    link: '#'
  },
  {
    id: 4,
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202503/2819/346190abf755e3883d1353fbc8d8ccb7e1acf076f1138d6b.jpg',
    alt: 'Slide 4',
    link: '#'
  },
  {
    id: 5,
    image: 'https://midias.correio24horas.com.br/2025/07/23/davi-brito-2827424-article.webp',
    alt: 'Slide 5',
    link: '#'
  }
];

export const carouselConfig = {
  autoplayInterval: 2000,
  transitionDuration: 500
};