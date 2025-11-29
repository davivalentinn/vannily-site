import type { Product } from '../types';

//Importar as imagens dos produtos
import marvelUnited from '../assets/images/products/marvel-united.png';
import ticketToRide from '../assets/images/products/ticket-to-ride.png';
import kelp from '../assets/images/products/kelp.png';

export const products: Product[] = [
  {
    id: 1,
    title: 'Marvel United',
    description: 'Um jogo cooperativo onde os heróis da Marvel se unem para derrotar vilões icônicos.',
    price: 249.99,
    originalPrice: 299.99,
    installments: 'ou 6x de 41,66 sem juros',
    image: marvelUnited,
    category: 'jogo',
    discount: '',
    gameInfo: {
      minAge: '10+',
      players: '1-4',
      duration: '40min'
    }
  },
  {
    id: 2,
    title: 'Ticket to Ride',
    description: 'Ticket to Ride é uma aventura de trem rail através dos Estados Unidos e Canadá, onde alguns velhos amigos se reuniram para celebrar a aposta ousada e lucrativa de Fogg. A nova aposta onde é tudo ou nada, com objetivo de ver quem consegue viajar de trem pelo maior número de cidades nos EUA em apenas 7 dias.',
    price: 329.99,
    originalPrice: 399.99,
    installments: 'ou 6x de 54,99 sem juros',
    image: ticketToRide,
    category: 'jogo',
    discount: 18,
    gameInfo: {
      minAge: '8+',
      players: '2-5',
      duration: '60min'
    }
  },
  {
    id: 3,
    title: 'Kelp',
    description: 'Um jogo de estratégia assimétrico onde você controla criaturas marinhas em um ecossistema dinâmico.',
    price: 189.99,
    originalPrice: 229.99,
    installments: 'ou 6x de 31,66 sem juros',
    image: kelp,
    category: 'jogo',
    discount: 22,
    gameInfo: {
      minAge: '12+',
      players: '2',
      duration: '30min'
    }
  },
  {
    id: 4,
    title: 'Headset Gamer RGB Blackfire',
    description: 'Headset gamer com iluminação RGB e som surround 7.1 para uma experiência imersiva.',
    price: 129.99,
    originalPrice: 199.99,
    installments: 'ou 6x de 21,66 sem juros',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop',
    category: 'acessorio',
    discount: 35
  },
  {
    id: 5,
    title: 'Camiseta Gamer Geek Mario Bros Camiseta 100% algodão com estampa exclusiva do Mario Bros Arcade.',
    description: 'Camiseta 100% algodão com estampa exclusiva do Mario Bros Arcade. ',
    price: 79.99,
    originalPrice: 99.99,
    installments: 'ou 3x de 26,66 sem juros',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    category: 'roupa',
    discount: 20
  },
  {
    id: 6,
    title: 'Cards Against Humanity',
    description: 'O jogo de cartas para pessoas horríveis. Diversão garantida para grupos de amigos.',
    price: 149.99,
    originalPrice: 199.99,
    installments: 'ou 6x de 24,99 sem juros',
    image: kelp,
    category: 'roupa',
    discount: 25,
    gameInfo: {
      minAge: '18+',
      players: '4-10',
      duration: '30min'
    }
  }
];