import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton } from '../../ui';
import backgroundImage from '../../../assets/images/background/carousel-bg.png';
import { Link } from 'react-router-dom';
import type { ProdutoCompleto } from '../../../services/produto-service';
import { useAuth } from '../../../context/authContext';
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
        className="hidden md:block w-full min-h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
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

        <div className="max-w-7xl mx-auto relative z-10 h-full flex justify-center items-center py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-4 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center w-full">

                {/* Informações */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 order-2 lg:order-1 flex flex-col justify-center mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-productCarousel font-montserrat">
                        {currentProduct.nome}
                    </h2>

                    <p className="text-white leading-relaxed text-justify text-sm sm:text-base md:text-base lg:text-lg font-roboto line-clamp-4 sm:line-clamp-5 md:line-clamp-6">
                        {currentProduct.descricao}
                    </p>

                    {/* Categoria */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-productCarousel/20 text-productCarousel rounded-full text-xs sm:text-sm font-semibold">
                            {currentProduct.categoriaNome}
                        </span>
                        {currentProduct.desconto > 0 && (
                            <span className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded-full text-xs sm:text-sm font-bold">
                                -{currentProduct.desconto}% OFF
                            </span>
                        )}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <div className="flex flex-wrap items-baseline gap-2">
                                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-productCarousel">
                                    R$ {formatPrice(currentProduct.preco)}
                                </span>
                                {currentProduct.desconto > 0 && (
                                    <span className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-400 line-through">
                                        R$ {formatPrice(calcularPrecoOriginal(currentProduct.preco, currentProduct.desconto))}
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                                Em até 12x de R$ {formatPrice(currentProduct.preco / 12)} sem juros
                            </p>
                        </div>

                        {/* Botões - Ocultos no mobile */}
                        <div className="hidden md:flex gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
                            <IconButton
                                variant='danger'
                                active={favorites.includes(currentProduct.id)}
                                onClick={() => toggleFavorite(currentProduct.id)}
                                aria-label="Adicionar aos favoritos"
                                className="p-2 sm:p-2.5 md:p-3"
                            >
                                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${favorites.includes(currentProduct.id) ? 'fill-current' : ''}`} />
                            </IconButton>

                            <Link to={`/produto/${currentProduct.id}#product-url`} className="flex-1">
                                <Button
                                    variant="button"
                                    size="md"
                                    className="w-full text-sm sm:text-base"
                                >
                                    Ver Detalhes
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Galeria */}
                <div className="relative order-1 lg:order-2 flex flex-col justify-center">
                    {/* Versão Desktop - com botões visíveis */}
                    <div className="hidden md:flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={produtos.length <= 1}
                            className="z-10 p-1.5 sm:p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                        </button>

                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 overflow-hidden">
                            {produtos.length > 1 && (
                                <div className="opacity-30 scale-75 transition-all duration-300">
                                    <img
                                        src={prevProduct.imagem}
                                        alt={prevProduct.nome}
                                        className="w-32 h-32 lg:w-48 lg:h-48 object-contain rounded-lg bg-white/10 p-3 lg:p-4"
                                    />
                                </div>
                            )}

                            <div className="scale-100 transition-all duration-300 shadow-2xl">
                                <img
                                    src={currentProduct.imagem}
                                    alt={currentProduct.nome}
                                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain rounded-lg bg-white/10 p-3 sm:p-4"
                                />
                            </div>

                            {produtos.length > 1 && (
                                <div className="opacity-30 scale-75 transition-all duration-300">
                                    <img
                                        src={nextProduct.imagem}
                                        alt={nextProduct.nome}
                                        className="w-32 h-32 lg:w-48 lg:h-48 object-contain rounded-lg bg-white/10 p-3 lg:p-4"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={produtos.length <= 1}
                            className="z-10 p-1.5 sm:p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Versão Mobile - slide horizontal sem botões */}
                    <div className="md:hidden">
                        <div 
                            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {produtos.map((produto, index) => (
                                <div 
                                    key={produto.id}
                                    className="flex-shrink-0 w-full snap-center"
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <div className="scale-100 transition-all duration-300 shadow-2xl">
                                        <img
                                            src={produto.imagem}
                                            alt={produto.nome}
                                            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-lg bg-white/10 p-3 sm:p-4"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicadores */}
                    {produtos.length > 1 && (
                        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 md:mt-6">
                            {produtos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-1.5 sm:h-2 rounded-full transition-all ${index === currentIndex
                                        ? 'w-6 sm:w-8 bg-background'
                                        : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-background/90'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `}</style>
    </div>
);
};

export default ProductCarousel;