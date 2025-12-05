import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton } from '../../ui';
import backgroundImage from '../../../assets/images/background/carousel-bg.png';
import { Link } from 'react-router-dom';
import type { ProdutoCompleto } from '../../../services/produto-service';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import LoginModal from '../../../features/auth/components/LoginModal/LoginModal';

interface ProductCarouselProps {
    produtos: ProdutoCompleto[]; // ✅ Recebe produtos por prop
    autoplayDelay?: number;
    backgroundUrl?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
    produtos,
    autoplayDelay = 3000,
    backgroundUrl = backgroundImage
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const { isAuthenticated } = useAuth();

    // Se não tem produtos, não renderiza nada
    if (!produtos || produtos.length === 0) {
        return null;
    }

    // Funções de navegação
    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : produtos.length - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev < produtos.length - 1 ? prev + 1 : 0
        );
    };

    const getPrevIndex = () =>
        currentIndex > 0 ? currentIndex - 1 : produtos.length - 1;

    const getNextIndex = () =>
        currentIndex < produtos.length - 1 ? currentIndex + 1 : 0;

    const currentProduct = produtos[currentIndex];
    const prevProduct = produtos[getPrevIndex()];
    const nextProduct = produtos[getNextIndex()];

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',');
    };

    const toggleFavorite = (productId: number) => {
        // Verifica se está logado
        if (!isAuthenticated) {
            setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
            setShowLoginModal(true);
            return;
        }

        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    // Calcula o preço original (antes do desconto)
    const calcularPrecoOriginal = (preco: number, desconto: number): number => {
        if (desconto <= 0) return preco;
        return preco / (1 - desconto / 100);
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
    }, [currentIndex, produtos.length]);

    return (
        <div
            className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundUrl})`
            }}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
        >
            {/* Modal de Login */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                message={loginMessage}
            />

            <div className="absolute inset-0 bg-black/95"></div>

            <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center py-12 px-4 overflow-y-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">

                    {/* Informações */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-4xl font-bold text-productCarousel font-montserrat">
                            {currentProduct.nome}
                        </h2>

                        <p className="text-white leading-relaxed text-justify text-lg font-roboto line-clamp-6">
                            {currentProduct.descricao}
                        </p>

                        {/* Categoria */}
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-productCarousel/20 text-productCarousel rounded-full text-sm font-semibold">
                                {currentProduct.categoriaNome}
                            </span>
                            {currentProduct.desconto > 0 && (
                                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                                    -{currentProduct.desconto}% OFF
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-productCarousel">
                                        R$ {formatPrice(currentProduct.preco)}
                                    </span>
                                    {currentProduct.desconto > 0 && (
                                        <span className="text-xl text-gray-400 line-through">
                                            R$ {formatPrice(calcularPrecoOriginal(currentProduct.preco, currentProduct.desconto))}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-400 mt-2">
                                    Em até 12x de R$ {formatPrice(currentProduct.preco / 12)} sem juros
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <IconButton
                                    variant='danger'
                                    active={favorites.includes(currentProduct.id)}
                                    onClick={() => toggleFavorite(currentProduct.id)}
                                    aria-label="Adicionar aos favoritos"
                                >
                                    <Heart className={`w-6 h-6 ${favorites.includes(currentProduct.id) ? 'fill-current' : ''}`} />
                                </IconButton>

                                <Link to={`/produto/${currentProduct.id}`} className="flex-1">
                                    <Button
                                        variant="button"
                                        size="md"
                                        className="w-full"
                                    >
                                        Ver Detalhes
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Galeria */}
                    <div className="relative order-1 lg:order-2">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={produtos.length <= 1}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700 hidden md:block" />
                            </button>

                            <div className="flex items-center gap-4 overflow-hidden">
                                {produtos.length > 1 && (
                                    <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                        <img
                                            src={prevProduct.imagem}
                                            alt={prevProduct.nome}
                                            className="w-48 h-48 object-contain rounded-lg bg-white/10 p-4"
                                        />
                                    </div>
                                )}

                                <div className="scale-100 transition-all duration-300 shadow-2xl">
                                    <img
                                        src={currentProduct.imagem}
                                        alt={currentProduct.nome}
                                        className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-lg bg-white/10 p-4"
                                    />
                                </div>

                                {produtos.length > 1 && (
                                    <div className="opacity-30 scale-75 transition-all duration-300 hidden md:block">
                                        <img
                                            src={nextProduct.imagem}
                                            alt={nextProduct.nome}
                                            className="w-48 h-48 object-contain rounded-lg bg-white/10 p-4"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={produtos.length <= 1}
                                className="z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Indicadores */}
                        {produtos.length > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {produtos.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'w-8 bg-background'
                                            : 'w-2 bg-gray-300 hover:bg-background/90'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;