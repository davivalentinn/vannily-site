import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { products } from './productData';
import type { Product } from './types';
import { Button, IconButton } from '../ui';
import backgroundImage from '../../assets/images/background/carousel-bg.png';

const ProductCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
    };

    const getPrevIndex = () => (currentIndex > 0 ? currentIndex - 1 : products.length - 1);
    const getNextIndex = () => (currentIndex < products.length - 1 ? currentIndex + 1 : 0);

    const currentProduct = products[currentIndex];
    const prevProduct = products[getPrevIndex()];
    const nextProduct = products[getNextIndex()];

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',');
    };

    return (
        <div 
            className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            {/* Overlay escuro para melhorar legibilidade */}
            <div className="absolute inset-0 bg-black/90"></div>
            
            {/* Container com scroll interno se necessário */}
            <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center py-12 px-4 overflow-y-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    {/* Informações do Produto */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-4xl font-bold text-productCarousel font-montserrat">
                            {currentProduct.title}
                        </h2>

                        <p className="text-white leading-relaxed text-justify text-lg font-roboto">
                            {currentProduct.description}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-productCarousel">
                                        R$ {formatPrice(currentProduct.price)}
                                    </span>
                                    <span className="text-xl text-gray-400 line-through">
                                        R$ {formatPrice(currentProduct.originalPrice)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2">
                                    {currentProduct.installments}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <IconButton
                                    variant='favorited'
                                    active={isFavorite}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    aria-label="Adicionar aos favoritos"
                                >
                                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                                </IconButton>

                                <Button
                                    variant="button"
                                    size="md"
                                    className="flex-1"
                                    onClick={() => console.log('Adicionado ao carrinho!')}
                                >
                                    Adicionar ao Carrinho
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Galeria de Imagens */}
                    <div className="relative order-1 lg:order-2">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                                aria-label="Produto anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>

                            <div className="flex items-center gap-4 overflow-hidden">
                                {/* Imagem Anterior */}
                                <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                    <img
                                        src={prevProduct.image}
                                        alt={prevProduct.title}
                                        className="w-48 h-48 object-cover rounded-lg"
                                    />
                                </div>

                                {/* Imagem Atual */}
                                <div className="scale-100 transition-all duration-300 shadow-2xl">
                                    <img
                                        src={currentProduct.image}
                                        alt={currentProduct.title}
                                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg"
                                    />
                                </div>

                                {/* Próxima Imagem */}
                                <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                    <img
                                        src={nextProduct.image}
                                        alt={nextProduct.title}
                                        className="w-48 h-48 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                                aria-label="Próximo produto"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Indicadores */}
                        <div className="flex justify-center gap-2 mt-6">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === currentIndex
                                        ? 'w-8 bg-background'
                                        : 'w-2 bg-gray-300 hover:bg-background/90'
                                        }`}
                                    aria-label={`Ir para produto ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;