import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    buscarProdutoPorId,
    type ProdutoGetDto,
    type ProdutoCompleto
} from "../../../services/produto-service";

import { ChevronLeft, ChevronRight, Heart, Users, Clock } from "lucide-react";
import { Button } from "../../ui";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import LoginModal from "../../../features/auth/components/LoginModal/LoginModal";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import LoadingBar from "../../Loading/LoadingBar";
import LoadingDots from "../../Loading/LoadingDots";
import LoadingCart from "../../Loading/LoadingCart";
import ProductGridShimmer from "../../Loading/SkeletonLoading/ProductGridShimmer";
import ProductGridSkeleton from "../../Loading/SkeletonLoading/ProductGridSkeleton";

interface ProductSliderProps {
    title: string;
    fetchFunction: () => Promise<ProdutoGetDto[]>; // função que busca os produtos
    itemsPerView?: number;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
    title,
    fetchFunction,
    itemsPerView = 4
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [produtos, setProdutos] = useState<ProdutoCompleto[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        async function carregar() {
            setLoading(true);
            try {
                console.log(`[${title}] Buscando produtos...`);

                // 1️⃣ Buscar produtos usando a função passada por prop
                const baseProducts: ProdutoGetDto[] = await fetchFunction();
                console.log(`[${title}] Produtos encontrados:`, baseProducts.length);

                // 2️⃣ Para cada produto, buscar o completo
                const completos: ProdutoCompleto[] = [];

                for (const prod of baseProducts) {
                    const completo = await buscarProdutoPorId(prod.id);
                    completos.push(completo);
                }

                setProdutos(completos);
                console.log(`[${title}] Produtos completos carregados:`, completos.length);
            } catch (error) {
                console.error(`[${title}] Erro ao carregar produtos:`, error);
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [fetchFunction, title]);

    const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () =>
        setStartIndex((prev) =>
            Math.min(produtos.length - itemsPerView, prev + 1)
        );

    const toggleFavorite = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();

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

    const handleAddToCart = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();

        // Verifica se está logado
        if (!isAuthenticated) {
            setLoginMessage("Você precisa estar logado para adicionar produtos ao carrinho.");
            setShowLoginModal(true);
            return;
        }

        // Aqui você adiciona a lógica do carrinho
        console.log("Adicionado ao carrinho:", productId);
        // TODO: Implementar lógica de adicionar ao carrinho
    };

    const formatPrice = (price: number) =>
        price.toFixed(2).replace(".", ",");

    const visibleProducts = produtos.slice(startIndex, startIndex + itemsPerView);

    if (loading)
        return <ProductGridSkeleton count={4} />;

    if (produtos.length === 0)
        return null;

    return (
        <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 bg-gray-50">
            {/* Modal de Login */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                message={loginMessage}
            />

            <div className="max-w-7xl mx-auto">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                    <h2 className="
                        relative inline-block
                        after:content-[''] after:block after:w-16 after:h-1
                      after:bg-title after:mt-1
                        text-xl sm:text-2xl md:text-3xl font-bold text-bar">{title}</h2>

                    {/* Botões - Visíveis apenas em SM+ */}
                    <div className="hidden sm:flex gap-1 sm:gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={startIndex === 0}
                            className="p-1.5 sm:p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={startIndex >= produtos.length - itemsPerView}
                            className="p-1.5 sm:p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                {/* Grid para Desktop (SM+) */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {visibleProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/produto/${product.id}#product-url`}
                            className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-[420px] md:h-[480px] lg:h-[520px]"
                        >
                            {/* Imagem */}
                            <div className="relative h-48 md:h-56 lg:h-64 bg-gray-50 flex items-center justify-center p-3 md:p-4">
                                <img
                                    src={product.imagem}
                                    alt={product.nome}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                />

                                {/* Desconto */}
                                {product.desconto > 0 && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        -{product.desconto}%
                                    </div>
                                )}

                                {/* Favorito */}
                                <button
                                    onClick={(e) => toggleFavorite(e, product.id)}
                                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                                >
                                    <Heart
                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${favorites.includes(product.id)
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </button>

                                {/* Informações extras somente se for jogo - Visível apenas em MD+ */}
                                {product.jogo && (
                                    <div className="hidden md:flex absolute top-14 right-3 flex-col gap-1.5">
                                        <div className="bg-white text-bar border-2 rounded-md p-1.5 shadow-md w-12 text-xs text-center font-bold">
                                            {product.jogo.classificacaoIndicativa}
                                        </div>

                                        <div className="bg-white border-2 rounded-md p-1.5 shadow-md w-12 flex flex-col items-center">
                                            <Users className="w-3.5 h-3.5 text-background" />
                                            <span className="text-xs text-bar font-bold">
                                                {product.jogo.qtdPessoas}
                                            </span>
                                        </div>

                                        <div className="bg-white border-2 rounded-md p-1.5 shadow-md w-12 flex flex-col items-center">
                                            <Clock className="w-3.5 h-3.5 text-background" />
                                            <span className="text-xs text-bar font-bold">
                                                {product.jogo.duracao}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info Interna */}
                            <div className="p-3 md:p-4 flex flex-col flex-1">

                                <h3 className="text-base md:text-lg lg:text-xl font-bold text-bar line-clamp-2 mb-3">
                                    {product.nome}
                                </h3>

                                {/* Tags */}
                                <div className="flex items-start gap-2 flex-wrap mb-2">
                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-productCarousel/20 text-bar rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap">
                                        {product.categoriaNome}
                                    </span>

                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-productCarousel/20 text-bar rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap">
                                        {product.tema}
                                    </span>

                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-productCarousel/20 text-bar rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap">
                                        {product.genero}
                                    </span>
                                </div>

                                {/* Preços */}
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-bar">
                                            R$ {formatPrice(product.preco)}
                                        </span>

                                        {product.desconto > 0 && (
                                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                                                R$ {formatPrice(product.preco + product.desconto)}
                                            </span>
                                        )}
                                    </div>

                                    <Button
                                        variant="button"
                                        size="md"
                                        className="w-full mt-2 sm:mt-3 text-xs sm:text-sm md:text-base"
                                        onClick={(e) => handleAddToCart(e, product.id)}
                                    >
                                        Adicionar ao Carrinho
                                    </Button>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>

                {/* Scroll Horizontal para Mobile */}
                <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-3">
                    <div className="flex gap-3 px-3 pb-2">
                        {produtos.map((product) => (
                            <Link
                                key={product.id}
                                to={`/produto/${product.id}#product-url`}
                                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col flex-shrink-0 w-[160px]"
                            >
                                {/* Imagem */}
                                <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2">
                                    <img
                                        src={product.imagem}
                                        alt={product.nome}
                                        className="max-w-full max-h-full object-contain"
                                    />

                                    {/* Desconto */}
                                    {product.desconto > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            -{product.desconto}%
                                        </div>
                                    )}
                                </div>

                                {/* Info Interna */}
                                <div className="p-3 flex flex-col flex-1">

                                    <h3 className="text-sm font-bold text-bar line-clamp-2 mb-2 min-h-[2.5rem]">
                                        {product.nome}
                                    </h3>

                                    {/* Preços */}
                                    <div className="mt-auto">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-bold text-bar">
                                                R$ {formatPrice(product.preco)}
                                            </span>

                                            {product.desconto > 0 && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    R$ {formatPrice(product.preco + product.desconto)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ProductSlider;