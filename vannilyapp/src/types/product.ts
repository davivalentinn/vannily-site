export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    installments: string;
    image: string;
    category: 'jogo' | 'acessorio' | 'roupa';
    gameInfo?: {
        minAge: string;
        players: string;
        duration: string;
    };
    discount?: number;
}