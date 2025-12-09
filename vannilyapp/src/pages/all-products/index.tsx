import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { SlidersHorizontal, Heart, Users, Clock, ShoppingCart } from "lucide-react";
import { searchProduto, listarTodosProdutos, buscarProdutoPorId } from "../../services/produto-service";
import type { ProdutoSearchResult } from "../../services/produto-service";
import { FilterModal } from "../../components/FilterModal";
import Button from "../../components/ui/Button.tsx";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/CartContext";
import LoginModal from "../../features/auth/components/LoginModal/LoginModal";
import { adicionarFavorito, removerFavorito, listarFavoritos } from "../../services/favoritarService";

export function AllProducts() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>(null);
  
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const { isAuthenticated, userId } = useAuth();
  const { addItem } = useCart();

  const searchTerm = searchParams.get("search") || "";

  // Carregar favoritos
  useEffect(() => {
    async function carregarFavoritos() {
      if (!isAuthenticated || !userId) {
        setFavorites([]);
        return;
      }

      setLoadingFavorites(true);
      try {
        const favoritosUsuario = await listarFavoritos(userId);
        const produtoIds = favoritosUsuario.map(fav => fav.produtoId);
        setFavorites(produtoIds);
      } catch (error: any) {
        console.error("Erro ao carregar favoritos:", error);
        setFavorites([]);
      } finally {
        setLoadingFavorites(false);
      }
    }

    carregarFavoritos();
  }, [isAuthenticated, userId]);

  // Carregar produtos
  useEffect(() => {
    loadProducts();
  }, [searchParams]);

  async function loadProducts() {
    setLoading(true);
    try {
      const search = searchParams.get("search");
      const filtersParam = searchParams.get("filters");
      
      let filters = null;
      if (filtersParam) {
        try {
          filters = JSON.parse(filtersParam);
          setCurrentFilters(filters);
        } catch (e) {
          console.error("Erro ao parsear filtros:", e);
        }
      } else {
        setCurrentFilters(null);
      }

      let results: ProdutoSearchResult[] = [];

      // Sempre carregar todos os produtos primeiro
      results = await listarTodosProdutos();

      // Aplicar filtros se existirem (mas NÃO filtrar por busca textual aqui)
      if (filters) {
        results = applyFilters(results, filters);
      }

      // Se houver busca por texto, priorizar o produto buscado no topo
      if (search && search.trim().length > 0) {
        const searchLower = search.trim().toLowerCase();
        
        // Separar: produtos que correspondem exatamente vs produtos relacionados
        const exactMatches: any[] = [];
        const relatedProducts: any[] = [];
        
        results.forEach((p: any) => {
          const nameMatch = p.nome?.toLowerCase().includes(searchLower);
          const descMatch = p.descricao?.toLowerCase().includes(searchLower);
          
          if (nameMatch || descMatch) {
            exactMatches.push(p);
          } else {
            relatedProducts.push(p);
          }
        });
        
        // Combinar: produtos correspondentes primeiro, depois relacionados
        results = [...exactMatches, ...relatedProducts];
      }

      // Buscar detalhes completos de cada produto
      const completos: any[] = [];
      for (const prod of results) {
        try {
          const completo = await buscarProdutoPorId((prod as any).id);
          completos.push(completo);
        } catch (error) {
          console.error(`Erro ao buscar produto ${(prod as any).id}:`, error);
        }
      }

      setProdutos(completos);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters(base: ProdutoSearchResult[], filters: any): ProdutoSearchResult[] {
    console.log("🔍 Aplicando filtros:", filters);
    console.log("📦 Produtos antes do filtro:", base.length);
    
    let temp = [...base];

    if (filters.tipoProduto === "jogo") {
      temp = temp.filter(p => Boolean((p as any).jogo));
      console.log("✅ Filtrado por tipo 'jogo':", temp.length);
    } else if (filters.tipoProduto === "roupa") {
      temp = temp.filter(p => Boolean((p as any).roupa));
      console.log("✅ Filtrado por tipo 'roupa':", temp.length);
    }

    if (filters.temaJogo) {
      temp = temp.filter(p => (p as any).jogo?.tema?.toLowerCase() === filters.temaJogo.toLowerCase());
      console.log("✅ Filtrado por tema:", temp.length);
    }

    if (filters.generoJogo) {
      temp = temp.filter(p => (p as any).jogo?.genero?.toLowerCase() === filters.generoJogo.toLowerCase());
      console.log("✅ Filtrado por gênero:", temp.length);
    }

    if (typeof filters.precoMax === "number") {
      temp = temp.filter(p => (p.preco ?? 0) <= filters.precoMax);
      console.log("✅ Filtrado por preço máximo:", temp.length);
    }

    if (filters.tipoJogo) {
      temp = temp.filter(p => (p as any).jogo?.tipoJogo?.toLowerCase() === filters.tipoJogo.toLowerCase());
      console.log("✅ Filtrado por tipo de jogo:", temp.length);
    }

    if (filters.complexidade) {
      temp = temp.filter(p => (p as any).jogo?.complexidade?.toLowerCase() === filters.complexidade.toLowerCase());
      console.log("✅ Filtrado por complexidade:", temp.length);
    }

    if (filters.tamanhoRoupa) {
      temp = temp.filter(p => (p as any).roupa?.tamanho?.toLowerCase() === filters.tamanhoRoupa.toLowerCase());
      console.log("✅ Filtrado por tamanho:", temp.length);
    }

    if (filters.corRoupa) {
      temp = temp.filter(p => (p as any).roupa?.cor?.toLowerCase() === filters.corRoupa.toLowerCase());
      console.log("✅ Filtrado por cor:", temp.length);
    }

    console.log("📊 Produtos após filtro:", temp.length);
    return temp;
  }

  function handleApplyFilters(filters: any) {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    
    if (filters) {
      params.append("filters", JSON.stringify(filters));
    }

    navigate(`/all-products?${params.toString()}`, { replace: true });
    setOpenFilters(false);
  }

  function clearFilters() {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    navigate(`/all-products?${params.toString()}`, { replace: true });
    setCurrentFilters(null);
  }

  // Gerar título dinâmico baseado nos filtros
  function getFilterTitle(): string {
    if (!currentFilters) {
      if (searchTerm) return `Resultados para "${searchTerm}"`;
      return "Todos os Produtos";
    }

    const parts: string[] = [];

    // Tipo de produto
    if (currentFilters.tipoProduto === "jogo") {
      parts.push("Jogos");
    } else if (currentFilters.tipoProduto === "roupa") {
      parts.push("Roupas");
    }

    // Características de jogo
    if (currentFilters.temaJogo) {
      parts.push(`tema ${currentFilters.temaJogo}`);
    }
    if (currentFilters.generoJogo) {
      parts.push(`gênero ${currentFilters.generoJogo}`);
    }
    if (currentFilters.tipoJogo) {
      parts.push(currentFilters.tipoJogo);
    }
    if (currentFilters.complexidade) {
      parts.push(`complexidade ${currentFilters.complexidade}`);
    }

    // Características de roupa
    if (currentFilters.tamanhoRoupa) {
      parts.push(`tamanho ${currentFilters.tamanhoRoupa}`);
    }
    if (currentFilters.corRoupa) {
      parts.push(`cor ${currentFilters.corRoupa}`);
    }

    // Preço
    if (typeof currentFilters.precoMax === "number" && currentFilters.precoMax < 1550) {
      parts.push(`até R$ ${currentFilters.precoMax}`);
    }

    if (parts.length === 0) {
      if (searchTerm) return `Resultados para "${searchTerm}"`;
      return "Todos os Produtos";
    }

    const filterText = parts.join(" • ");
    
    if (searchTerm) {
      return `Resultados para "${searchTerm}" • ${filterText}`;
    }
    
    return `Resultados para: ${filterText}`;
  }

  // Favoritar/Desfavoritar
  const toggleFavorite = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || !userId) {
      setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
      setShowLoginModal(true);
      return;
    }

    const isFavorited = favorites.includes(productId);

    setFavorites(prev =>
      isFavorited
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    try {
      if (isFavorited) {
        await removerFavorito(userId, productId);
      } else {
        await adicionarFavorito({
          usuarioId: userId,
          produtoId: productId
        });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar favorito:", error);
      
      setFavorites(prev =>
        isFavorited
          ? [...prev, productId]
          : prev.filter(id => id !== productId)
      );

      if (error?.response?.status === 403) {
        setLoginMessage("Sua sessão expirou. Por favor, faça login novamente.");
        setShowLoginModal(true);
      } else if (error?.response?.status === 401) {
        setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
        setShowLoginModal(true);
      } else {
        alert("Erro ao atualizar favoritos. Tente novamente.");
      }
    }
  };

  // Adicionar ao carrinho
  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setLoginMessage("Você precisa estar logado para adicionar produtos ao carrinho.");
      setShowLoginModal(true);
      return;
    }

    try {
      await addItem(productId, 1);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho. Tente novamente.");
    }
  };

  const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message={loginMessage}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {getFilterTitle()}
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {produtos.length} {produtos.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            {currentFilters && (
              <button
                onClick={clearFilters}
                className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Limpar filtros
              </button>
            )}
            <button
              onClick={() => setOpenFilters(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-[#8B1689] text-white rounded hover:bg-[#701070] transition"
            >
              <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              Filtros
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Carregando produtos...</p>
          </div>
        )}

        {/* Nenhum produto */}
        {!loading && produtos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto encontrado.</p>
            {searchTerm && (
              <p className="text-gray-500 mt-2">Tente buscar por outro termo ou ajuste os filtros.</p>
            )}
          </div>
        )}

        {/* Grid Desktop */}
        {!loading && produtos.length > 0 && (
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map(product => (
              <Link
                key={product.id}
                to={`/produto/${product.id}#product-select`}
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
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                      -{product.desconto}%
                    </div>
                  )}

                  {/* Favorito */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    disabled={loadingFavorites}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                  </button>

                  {/* Info extra de jogos */}
                  {product.jogo && (
                    <div className="absolute top-16 right-3 flex-col gap-2 hidden md:flex">
                      <div className="bg-white border-2 text-background rounded-md p-2 w-12 text-xs font-bold text-center shadow-sm">
                        {product.jogo.classificacaoIndicativa}
                      </div>

                      <div className="bg-white border-2 rounded-md p-2 w-12 flex flex-col items-center shadow-sm">
                        <Users className="w-4 h-4 text-background" />
                        <span className="text-xs text-background font-bold">{product.jogo.qtdPessoas}</span>
                      </div>

                      <div className="bg-white border-2 rounded-md p-2 w-12 flex flex-col items-center shadow-sm">
                        <Clock className="w-4 h-4 text-background" />
                        <span className="text-xs text-background font-bold">{product.jogo.duracao}</span>
                      </div>
                    </div>
                  )}

                  {/* Info extra de roupas */}
                  {product.roupa && (
                    <div className="absolute top-16 right-3 flex-col gap-2 hidden md:flex">
                      {product.roupa.tamanho && (
                        <div className="bg-white border-2 text-background rounded-md p-2 w-12 text-xs font-bold text-center shadow-sm">
                          {product.roupa.tamanho}
                        </div>
                      )}

                      {product.roupa.cor && (
                        <div className="bg-white border-2 rounded-md p-2 px-3 flex items-center justify-center shadow-sm">
                          <span className="text-xs text-background font-bold">{product.roupa.cor}</span>
                        </div>
                      )}
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

                    {product.tema && (
                      <span className="px-3 py-1 bg-productCarousel/20 rounded-xl text-sm font-semibold text-bar">
                        {product.tema}
                      </span>
                    )}

                    {product.genero && (
                      <span className="px-3 py-1 bg-productCarousel/20 rounded-xl text-sm font-semibold text-bar">
                        {product.genero}
                      </span>
                    )}
                  </div>

                  {/* Preço + Botão */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-bar">
                        R$ {formatPrice(product.preco)}
                      </span>

                      {product.desconto > 0 && (
                        <span className="text-gray-400 line-through text-sm">
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
        )}

        {/* Mobile - Cards Compactos em Grid */}
        {!loading && produtos.length > 0 && (
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {produtos.map(product => (
              <Link
                key={product.id}
                to={`/produto/${product.id}`}
                className="bg-white rounded-lg shadow border flex flex-col overflow-hidden hover:shadow-md transition-shadow"
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

                  {/* Favorito Mobile */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    disabled={loadingFavorites}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md disabled:opacity-50"
                    aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm text-bar font-bold line-clamp-2 mb-2">
                    {product.nome}
                  </h3>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-base font-bold text-bar">
                      R$ {formatPrice(product.preco)}
                    </span>
                    
                    <button
                      onClick={(e) => handleAddToCart(e, product.id)}
                      className="p-2 bg-[#8B1689] text-white rounded hover:bg-[#701070] transition-all shadow-md"
                      aria-label="Adicionar ao carrinho"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <FilterModal
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        onApply={handleApplyFilters}
        initialFilters={currentFilters}
      />

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
}