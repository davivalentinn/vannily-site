import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Importando TIPO PRODUTOS
import type { Product } from '../../types';
import { products } from '../../data';
//Fim importando tipo produtos

//Importa icones
import { ChevronLeft, ChevronRight, Heart, Users, Clock } from 'lucide-react';

//Importa components reutilizaveis
import { Button, IconButton } from '../ui';


const ProductSlider: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([]);
    const itemsPerView = 4;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(products.length - itemsPerView, prev + 1)
        );
    };

    const toggleFavorite = (e: React.MouseEvent, productId: number) => {
        e.preventDefault(); // Previne navegação quando clicar no coração
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleAddToCart = (e: React.MouseEvent, productTitle: string) => {
        e.preventDefault(); // Previne navegação quando clicar no botão
        e.stopPropagation();
        console.log(`Adicionado ao carrinho: ${productTitle}`);
    };

    const visibleProducts = products.slice(startIndex, startIndex + itemsPerView);

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',');
    };

    return (
        <div className="w-full py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-bar">
                        Produtos em Promoção
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={startIndex === 0}
                            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={startIndex >= products.length - itemsPerView}
                            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Próximo"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Grid de Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-[480px] flex flex-col group"
                        >
                            {/* Imagem com Badge de Desconto */}
                            <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Badge de Desconto */}
                                {product.discount && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                                        -{product.discount}%
                                    </div>
                                )}

                                {/* Botão Favoritar */}
                                <button
                                    onClick={(e) => toggleFavorite(e, product.id)}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
                                    aria-label="Favoritar"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(product.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-gray-400'
                                            }`}
                                    />
                                </button>

                                {/* Info do Jogo - Apenas para categoria 'jogo' */}
                                {product.category === 'jogo' && product.gameInfo && (
                                    <div className="absolute top-14 right-3 flex flex-col gap-1.5 z-10">
                                        {/* Idade */}
                                        <div className="bg-white border-2 border-background rounded-md p-1.5 shadow-md flex items-center justify-center w-12">
                                            <span className="text-xs font-bold text-background">
                                                {product.gameInfo.minAge}
                                            </span>
                                        </div>

                                        {/* Jogadores */}
                                        <div className="bg-white border-2 border-background rounded-md p-1.5 shadow-md flex flex-col items-center w-12">
                                            <Users className="w-3.5 h-3.5 text-background" />
                                            <span className="text-[10px] font-bold text-background leading-tight">
                                                {product.gameInfo.players}
                                            </span>
                                        </div>

                                        {/* Duração */}
                                        <div className="bg-white border-2 border-background rounded-md p-1.5 shadow-md flex flex-col items-center w-12">
                                            <Clock className="w-3.5 h-3.5 text-background" />
                                            <span className="text-[10px] font-bold text-background leading-tight">
                                                {product.gameInfo.duration}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Informações */}
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-bar line-clamp-2 h-16 mb-3">
                                    {product.title}
                                </h3>

                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="text-2xl font-bold text-bar">
                                            R$ {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            R$ {formatPrice(product.originalPrice)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {product.installments}
                                    </p>

                                    <Button
                                        variant='button'
                                        size='md'
                                        className='w-full mt-3'
                                        onClick={(e) => handleAddToCart(e, product.title)}
                                    >
                                        Adicionar ao Carrinho
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;