import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    buscarProdutoPorId,
    type ProdutoGetDto,
    type ProdutoCompleto
} from "../../../services/produto-service";

import { ChevronLeft, ChevronRight, Heart, Users, Clock } from "lucide-react";
import { Button } from "../../ui";
import { useAuth } from "../../../context/authContext";
import LoginModal from "../../../features/auth/components/LoginModal/LoginModal";
import ProductGridSkeleton from "../../Loading/SkeletonLoading/ProductGridSkeleton";
import { useCart } from "../../../context/CartContext";

interface ProductSliderProps {
    title: string;
    fetchFunction: () => Promise<ProdutoGetDto[]>;
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
    const { addItem } = useCart();

    // 🔹 Carregar produtos
    useEffect(() => {
        async function carregar() {
            setLoading(true);
            try {
                const baseProducts = await fetchFunction();

                const completos: ProdutoCompleto[] = [];
                for (const prod of baseProducts) {
                    const completo = await buscarProdutoPorId(prod.id);
                    completos.push(completo);
                }

                setProdutos(completos);
            } catch {
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [fetchFunction]);

    const handlePrev = () => setStartIndex(prev => Math.max(0, prev - 1));

    const handleNext = () =>
        setStartIndex(prev =>
            Math.min(produtos.length - itemsPerView, prev + 1)
        );

    // 🔹 Favoritar
    const toggleFavorite = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
            setShowLoginModal(true);
            return;
        }

        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // 🔹 Adicionar ao carrinho
    const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            setLoginMessage("Você precisa estar logado para adicionar produtos ao carrinho.");
            setShowLoginModal(true);
            return;
        }

        await addItem(productId, 1);
    };

    const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

    const visibleProducts = produtos.slice(startIndex, startIndex + itemsPerView);

    // 🔹 Loading Skeleton
    if (loading) {
        return <ProductGridSkeleton count={itemsPerView} />;
    }

    if (produtos.length === 0) return null;

    return (
        <div className="w-full py-8 px-3 sm:px-4 bg-gray-50">

            {/* Modal de Login */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                message={loginMessage}
            />

            <div className="max-w-7xl mx-auto">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="relative inline-block text-2xl sm:text-3xl font-bold text-bar">
                        {title}
                        <span className="block w-16 h-1 bg-title mt-1"></span>
                    </h2>

                    {/* Navegação Desktop */}
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={startIndex === 0}
                            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={startIndex >= produtos.length - itemsPerView}
                            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Grid Desktop */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleProducts.map(product => (
                        <Link
                            key={product.id}
                            to={`/produto/${product.id}`}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border flex flex-col overflow-hidden group h-[520px]"
                        >
                            {/* Imagem */}
                            <div className="relative h-60 bg-gray-50 flex items-center justify-center p-4">
                                <img
                                    src={product.imagem}
                                    alt={product.nome}
                                    className="max-h-full object-contain group-hover:scale-105 transition-transform"
                                />

                                {/* Badge Desconto */}
                                {product.desconto > 0 && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        -{product.desconto}%
                                    </div>
                                )}

                                {/* Favorito */}
                                <button
                                    onClick={(e) => toggleFavorite(e, product.id)}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(product.id)
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </button>

                                {/* Info extra de jogos */}
                                {product.jogo && (
                                    <div className="absolute top-16 right-3 flex-col gap-2 hidden md:flex">
                                        <div className="bg-white border-2 rounded-md p-2 w-12 text-xs font-bold text-center">
                                            {product.jogo.classificacaoIndicativa}
                                        </div>

                                        <div className="bg-white border-2 rounded-md p-2 w-12 flex flex-col items-center">
                                            <Users className="w-4 h-4 text-background" />
                                            <span className="text-xs text-bar font-bold">{product.jogo.qtdPessoas}</span>
                                        </div>

                                        <div className="bg-white border-2 rounded-md p-2 w-12 flex flex-col items-center">
                                            <Clock className="w-4 h-4 text-background" />
                                            <span className="text-xs text-bar font-bold">{product.jogo.duracao}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Conteúdo */}
                            <div className="p-4 flex flex-col flex-1">

                                <h3 className="text-lg font-bold line-clamp-2 mb-3 text-bar">
                                    {product.nome}
                                </h3>

                                {/* Tags */}
                                <div className="flex gap-2 flex-wrap mb-2">
                                    <span className="px-3 py-1 bg-productCarousel/20 rounded-xl text-sm font-semibold text-bar">
                                        {product.categoriaNome}
                                    </span>

                                    <span className="px-3 py-1 bg-productCarousel/20 rounded-xl text-sm font-semibold text-bar">
                                        {product.tema}
                                    </span>

                                    <span className="px-3 py-1 bg-productCarousel/20 rounded-xl text-sm font-semibold text-bar">
                                        {product.genero}
                                    </span>
                                </div>

                                {/* Preço + Botão */}
                                <div className="mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-bar">
                                            R$ {formatPrice(product.preco)}
                                        </span>

                                        {product.desconto > 0 && (
                                            <span className="text-gray-400 line-through">
                                                R$ {formatPrice(product.preco + product.desconto)}
                                            </span>
                                        )}
                                    </div>

                                    <Button
                                        variant="button"
                                        size="md"
                                        className="w-full mt-3"
                                        onClick={(e) => handleAddToCart(e, product.id)}
                                    >
                                        Adicionar ao Carrinho
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile Horizontal Scroll */}
                <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-3">
                    <div className="flex gap-3 px-3 pb-2">
                        {produtos.map(product => (
                            <Link
                                key={product.id}
                                to={`/produto/${product.id}`}
                                className="bg-white rounded-lg shadow border flex flex-col flex-shrink-0 w-[160px]"
                            >
                                <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2">
                                    <img
                                        src={product.imagem}
                                        alt={product.nome}
                                        className="max-h-full object-contain"
                                    />

                                    {product.desconto > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            -{product.desconto}%
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 flex flex-col flex-1">
                                    <h3 className="text-sm font-bold line-clamp-2 mb-2">
                                        {product.nome}
                                    </h3>

                                    <div className="mt-auto">
                                        <span className="text-base font-bold text-bar">
                                            R$ {formatPrice(product.preco)}
                                        </span>
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
