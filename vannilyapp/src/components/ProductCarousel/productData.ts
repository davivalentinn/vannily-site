import type { Product } from './types';

//Importar as imagens dos produtos
import marvelUnited from '../../assets/images/products/marvel-united.png';
import ticketToRide from '../../assets/images/products/ticket-to-ride.png';
import kelp from '../../assets/images/products/kelp.png';


export const products: Product[] = [
  {
    id: 1,
    title: 'Marvel United',
    description: 'Um jogo cooperativo onde os heróis da Marvel se unem para derrotar vilões icônicos.',
    price: 249.99,
    originalPrice: 299.99,
    installments: 'ou 6x de 41,66 sem juros',
    image: marvelUnited as string
  },
  {
    id: 2,
    title: 'Ticket to Ride',
    description: 'Ticket to Ride é uma aventura de trem rail através dos Estados Unidos e Canadá, onde alguns velhos amigos se reuniram para celebrar a aposta ousada e lucrativa de Fogg. A nova aposta onde é tudo ou nada, com objetivo de ver quem consegue viajar de trem pelo maior número de cidades nos EUA em apenas 7 dias. ',
    price: 329.99,
    originalPrice: 399.99,
    installments: 'ou 6x de 54,99 sem juros',
    image: ticketToRide as string
  },
  {
    id: 3,
    title: 'Kelp',
    description: 'Um jogo de estratégia assimétrico onde você controla criaturas marinhas em um ecossistema dinâmico.',
    price: 189.99,
    originalPrice: 229.99,
    installments: 'ou 6x de 31,66 sem juros',
    image: kelp as string
  }
];