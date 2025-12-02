import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { products } from '../../data';
import type { Product } from '../../types';
import { Button, IconButton } from '../ui';
import backgroundImage from '../../assets/images/background/carousel-bg.png';

interface ProductCarouselProps {
    limit?: number; // número de produtos a exibir
    autoplayDelay?: number; // delay do autoplay
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
    limit = 3,
    autoplayDelay = 2000
}) => {
    const carouselProducts = products.slice(0, limit);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // Funções de navegação
    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : carouselProducts.length - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev < carouselProducts.length - 1 ? prev + 1 : 0
        );
    };

    const getPrevIndex = () =>
        currentIndex > 0 ? currentIndex - 1 : carouselProducts.length - 1;

    const getNextIndex = () =>
        currentIndex < carouselProducts.length - 1 ? currentIndex + 1 : 0;

    const currentProduct = carouselProducts[currentIndex];
    const prevProduct = carouselProducts[getPrevIndex()];
    const nextProduct = carouselProducts[getNextIndex()];

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',');
    };

    // ----------------------------
    // 🔁 AUTOPLAY
    // ----------------------------
    const startAutoplay = () => {
        stopAutoplay();
        autoplayRef.current = setInterval(() => {
            handleNext();
        }, autoplayDelay);
    };

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }
    };

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, [currentIndex, limit]);

    return (
        <div
            className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
        >
            <div className="absolute inset-0 bg-black/95"></div>

            <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center py-12 px-4 overflow-y-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    
                    {/* Informações */}
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
                                    variant='danger'
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

                    {/* Galeria */}
                    <div className="relative order-1 lg:order-2">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>

                            <div className="flex items-center gap-4 overflow-hidden">
                                {carouselProducts.length > 1 && (
                                    <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                        <img
                                            src={prevProduct.image}
                                            alt={prevProduct.title}
                                            className="w-48 h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                <div className="scale-100 transition-all duration-300 shadow-2xl">
                                    <img
                                        src={currentProduct.image}
                                        alt={currentProduct.title}
                                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg"
                                    />
                                </div>

                                {carouselProducts.length > 1 && (
                                    <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                        <img
                                            src={nextProduct.image}
                                            alt={nextProduct.title}
                                            className="w-48 h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleNext}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Indicadores */}
                        <div className="flex justify-center gap-2 mt-6">
                            {carouselProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        index === currentIndex
                                            ? 'w-8 bg-background'
                                            : 'w-2 bg-gray-300 hover:bg-background/90'
                                    }`}
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
