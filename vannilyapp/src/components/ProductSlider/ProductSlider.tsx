import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { listarPromocoes, buscarProdutoPorId, type ProdutoGetDto, type ProdutoCompleto } from "../../services/produto-service";

import { ChevronLeft, ChevronRight, Heart, Users, Clock } from "lucide-react";
import { Button } from "../ui";

const ProductSlider: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [produtos, setProdutos] = useState<ProdutoCompleto[]>([]);
    const [loading, setLoading] = useState(true);

    const itemsPerView = 4;

    useEffect(() => {
        async function carregar() {
            setLoading(true);

            // 1️⃣ Buscar promoções (dados básicos)
            const baseProducts: ProdutoGetDto[] = await listarPromocoes();

            // 2️⃣ Para cada produto, buscar o completo (somente para jogos / roupas)
            const completos: ProdutoCompleto[] = [];

            for (const prod of baseProducts) {
                const completo = await buscarProdutoPorId(prod.id);
                completos.push(completo);
            }

            setProdutos(completos);
            setLoading(false);
        }

        carregar();
    }, []);

    const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () =>
        setStartIndex((prev) =>
            Math.min(produtos.length - itemsPerView, prev + 1)
        );

    const toggleFavorite = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();

        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const formatPrice = (price: number) =>
        price.toFixed(2).replace(".", ",");

    const visibleProducts = produtos.slice(startIndex, startIndex + itemsPerView);

    if (loading)
        return <p className="text-center p-10">Carregando promoções...</p>;

    return (
        <div className="w-full py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-bar">Promoções</h2>

                    <div className="flex gap-2">
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

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/produto/${product.id}`}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-[480px] flex flex-col group"
                        >
                            {/* Imagem */}
                            <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
                                <img
                                    src={product.imagem}
                                    alt={product.nome}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                />

                                {/* Desconto */}
                                {product.desconto > 0 && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        -{product.desconto}%
                                    </div>
                                )}

                                {/* Favorito */}
                                <button
                                    onClick={(e) => toggleFavorite(e, product.id)}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(product.id)
                                                ? "fill-red-500 text-red-500"
                                                : "text-gray-400"
                                            }`}
                                    />
                                </button>

                                {/* Informações extras somente se for jogo */}
                                {product.jogo && (
                                    <div className="absolute top-14 right-3 flex flex-col gap-1.5">
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
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-bar line-clamp-2 h-16 mb-3">
                                    {product.nome}
                                </h3>

                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-bar">
                                            R$ {formatPrice(product.preco)}
                                        </span>

                                        {product.desconto > 0 && (
                                            <span className="text-sm text-gray-400 line-through">
                                                R$ {formatPrice(product.preco + product.desconto)}
                                            </span>
                                        )}
                                    </div>

                                    <Button variant="button" size="md" className="w-full mt-3">
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
