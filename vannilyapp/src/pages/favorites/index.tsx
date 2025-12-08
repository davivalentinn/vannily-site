import { useState, useEffect } from "react";
import {
  listarFavoritos,
  removerFavorito,
  limparFavoritos,
} from "../../services/favoritarService";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/authContext";

interface Product {
  id: number;
  title: string;
  oldPrice: string;
  price: string;
  size: string;
  color: string;
  stock: boolean;
  img: string;
  quantity: number;
}

export function Favorites() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );

  // 🔥 USANDO O AUTHCONTEXT AQUI!
  const { userId, isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    if (isAuthenticated && userId) {
      carregarFavoritos();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, userId]);

  const carregarFavoritos = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const favoritos = await listarFavoritos(userId);

      const produtosMapeados: Product[] = favoritos.map((fav) => ({
        id: fav.produtoId,
        title: fav.produtoNome,
        oldPrice: "R$ 219,99",
        price: "R$ 129,99",
        size: "G",
        color: "Estampado",
        stock: true,
        img: fav.produtoImagem,
        quantity: 1,
      }));

      setProducts(produtosMapeados);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      alert("Erro ao carregar favoritos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoverFavorito = async (produtoId: number) => {
    if (!userId) return;

    try {
      await removerFavorito(userId, produtoId);
      setProducts(products.filter((p) => p.id !== produtoId));
      setSelectedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(produtoId);
        return newSet;
      });
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      alert("Erro ao remover favorito. Tente novamente.");
    }
  };

  const handleLimparFavoritos = async () => {
    if (!userId) return;

    if (window.confirm("Deseja realmente limpar todos os favoritos?")) {
      try {
        await limparFavoritos(userId);
        setProducts([]);
        setSelectedProducts(new Set());
      } catch (error) {
        console.error("Erro ao limpar favoritos:", error);
        alert("Erro ao limpar favoritos. Tente novamente.");
      }
    }
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const handleToggleSelect = (id: number) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const handleAdicionarAoCarrinho = async (product: Product) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      return;
    }

    try {
      await addItem(product.id, product.quantity);
      alert(`${product.title} adicionado ao carrinho!`);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho. Tente novamente.");
    }
  };

  const handleAdicionarSelecionadosAoCarrinho = async () => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      return;
    }

    if (selectedProducts.size === 0) {
      alert("Selecione pelo menos um produto.");
      return;
    }

    try {
      const promises = Array.from(selectedProducts).map((produtoId) => {
        const product = products.find((p) => p.id === produtoId);
        if (product) {
          return addItem(product.id, product.quantity);
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      alert(`${selectedProducts.size} produto(s) adicionado(s) ao carrinho!`);
      setSelectedProducts(new Set());
    } catch (error) {
      console.error("Erro ao adicionar produtos ao carrinho:", error);
      alert("Erro ao adicionar produtos ao carrinho. Tente novamente.");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="w-full bg-white text-[#353535] font-[Montserrat]">
        <section className="max-w-[1300px] mx-auto py-20">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1689]"></div>
              <div className="text-xl">Carregando favoritos...</div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="w-full bg-white text-[#353535] font-[Montserrat]">
        <section className="max-w-[1300px] mx-auto py-20 px-4">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <i className="ri-lock-line text-[80px] text-gray-300"></i>
            <h2 className="text-2xl font-bold text-gray-600">Acesso Restrito</h2>
            <p className="text-gray-500">Você precisa estar logado para ver seus favoritos.</p>
            <a
              href="/account/login"
              className="mt-4 bg-[#8B1689] text-white px-6 py-2 rounded-md hover:bg-[#6d0f6b] transition"
            >
              Fazer Login
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full bg-white text-[#353535] font-[Montserrat]">
      <section className="max-w-[1300px] mx-auto py-20 px-4">
        {/* Título */}
        <div className="mb-4">
          <h1 className="text-[30px] font-extrabold uppercase">Favoritos</h1>
          <div className="w-full h-1 bg-gradient-to-r from-[#8B1689] to-[#D946EF]"></div>
        </div>

        {/* Caixa Branca */}
        <div className="bg-white border border-gray-300 shadow-md rounded-md">
          {/* Barra Superior */}
          <div className="flex flex-wrap justify-between items-center p-2 border-b border-gray-200 rounded-t-md gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border-[3px] border-[#353535] rounded-full flex justify-center items-center ml-2 sm:ml-6">
                <i className="ri-user-3-line text-[30px] text-[#353535] cursor-pointer"></i>
              </div>
              <button className="border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition">
                + Convidar
              </button>
            </div>

            <div className="flex gap-2 mr-2 sm:mr-6">
              {selectedProducts.size > 0 && (
                <button
                  onClick={handleAdicionarSelecionadosAoCarrinho}
                  className="border-2 border-[#8B1689] text-[#8B1689] rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-[#8B1689] hover:text-white transition"
                >
                  <i className="ri-shopping-cart-2-line mr-1"></i>
                  Adicionar selecionados ({selectedProducts.size})
                </button>
              )}
              <button className="border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition">
                Adicionar produto
              </button>
              {products.length > 0 && (
                <button
                  onClick={handleLimparFavoritos}
                  className="border border-red-500 text-red-500 rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-red-50 transition"
                >
                  Limpar todos
                </button>
              )}
            </div>
          </div>

          {/* Barra Inferior */}
          <div className="border-b border-gray-200">
            <div className="w-full h-1 bg-gradient-to-r from-[#8B1689] to-[#D946EF]"></div>

            <div className="flex flex-wrap justify-between items-center py-2 px-4 sm:px-6 gap-4">
              {/* Ícones */}
              <div className="flex items-center gap-3">
                {view === "list" && (
                  <button
                    onClick={handleSelectAll}
                    className="text-sm font-medium text-[#8B1689] hover:underline mr-2"
                  >
                    {selectedProducts.size === filteredProducts.length
                      ? "Desmarcar todos"
                      : "Selecionar todos"}
                  </button>
                )}
                <i
                  className={`ri-menu-line text-[24px] cursor-pointer pb-1 ${
                    view === "list"
                      ? "text-[#8B1689] border-b-4 border-[#8B1689]"
                      : "text-[#353535]"
                  }`}
                  onClick={() => setView("list")}
                ></i>

                <i
                  className={`ri-grid-fill text-[24px] cursor-pointer pb-1 ${
                    view === "grid"
                      ? "text-[#8B1689] border-b-4 border-[#8B1689]"
                      : "text-[#353535]"
                  }`}
                  onClick={() => setView("grid")}
                ></i>
              </div>

              {/* Buscar */}
              <div className="flex items-center flex-1 max-w-md">
                <i className="ri-search-line text-[#353535] text-[20px] mr-2 cursor-pointer"></i>
                <input
                  type="text"
                  placeholder="Buscar nos Favoritos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-black w-full rounded-md px-3 py-1 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1689]"
                />
              </div>
            </div>
          </div>

          {/* Produtos */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <i className="ri-heart-line text-[80px] text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">
                {searchTerm
                  ? "Nenhum favorito encontrado"
                  : "Você ainda não tem favoritos"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Adicione produtos aos favoritos para vê-los aqui
              </p>
            </div>
          ) : (
            <div
              className={
                view === "list"
                  ? "flex flex-col"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6"
              }
            >
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={
                    view === "list"
                      ? "flex flex-col sm:flex-row justify-between border-b border-gray-200 p-3 gap-4"
                      : "border border-gray-300 rounded-md shadow-sm p-3 flex flex-col items-center hover:shadow-lg transition-shadow"
                  }
                >
                  {/* LISTA */}
                  {view === "list" && (
                    <>
                      <div className="flex flex-1 gap-3">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(p.id)}
                          onChange={() => handleToggleSelect(p.id)}
                          className="w-[18px] h-[18px] accent-[#8B1689] border-2 border-[#8B1689] rounded-md cursor-pointer self-start mt-2"
                        />

                        <div className="bg-[#D7D7D7] w-[120px] h-[140px] sm:h-[180px] rounded-md flex justify-center items-center flex-shrink-0">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-[100px] h-[100px] sm:h-[130px] object-contain"
                          />
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                          <h2 className="uppercase text-[13px] sm:text-[14px] font-extrabold line-clamp-2">
                            {p.title}
                          </h2>

                          {p.stock && (
                            <div className="bg-green-600 w-fit px-3 h-[30px] rounded-md mt-1 flex justify-center items-center">
                              <p className="text-white text-[12px] sm:text-[14px] font-bold">
                                EM ESTOQUE
                              </p>
                            </div>
                          )}

                          <p className="line-through text-[#656565] mt-2 text-[13px] sm:text-[15px]">
                            {p.oldPrice}
                          </p>

                          <p className="text-[18px] sm:text-[20px] font-extrabold">
                            {p.price}
                          </p>

                          <div className="flex items-center border-2 border-[#333] rounded-md h-[35px] w-[120px] mt-2 justify-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(p.id, -1)}
                              className="font-extrabold hover:text-[#8B1689]"
                            >
                              -
                            </button>
                            <span className="font-extrabold">{p.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(p.id, 1)}
                              className="font-extrabold hover:text-[#8B1689]"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center mt-2 text-[12px] sm:text-[14px] gap-1">
                            <p>Tamanho:</p>
                            <p className="font-extrabold">{p.size}</p>
                            <span>•</span>
                            <p>Cor:</p>
                            <p className="font-extrabold">{p.color}</p>
                          </div>
                        </div>
                      </div>

                      {/* Botões direita */}
                      <div className="flex flex-col sm:items-end justify-center gap-2 p-2">
                        <button
                          onClick={() => handleAdicionarAoCarrinho(p)}
                          className="group border-2 border-[#8B1689] text-[#8B1689] font-semibold rounded-md px-4 py-2 text-[14px] hover:bg-[#8B1689] hover:text-white transition whitespace-nowrap"
                        >
                          <i className="ri-shopping-cart-2-line mr-1"></i>
                          Adicionar ao carrinho
                        </button>

                        <button
                          onClick={() => handleRemoverFavorito(p.id)}
                          className="text-red-500 hover:text-red-700 transition text-sm"
                        >
                          <i className="ri-heart-fill text-[24px]"></i>
                        </button>
                      </div>
                    </>
                  )}

                  {/* GRID */}
                  {view === "grid" && (
                    <>
                      <div className="relative w-full">
                        <div className="bg-[#D7D7D7] w-full h-[180px] rounded-md flex justify-center items-center">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-[130px] h-[130px] object-contain"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoverFavorito(p.id)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                        >
                          <i className="ri-heart-fill text-[20px] text-red-500"></i>
                        </button>
                      </div>

                      <h3 className="text-center text-[12px] font-semibold mt-2 line-clamp-2 h-10">
                        {p.title}
                      </h3>

                      <p className="line-through text-[#656565] text-[12px]">
                        {p.oldPrice}
                      </p>

                      <p className="text-center font-extrabold text-[18px]">
                        {p.price}
                      </p>

                      <button
                        onClick={() => handleAdicionarAoCarrinho(p)}
                        className="w-full border-2 border-[#8B1689] text-[#8B1689] rounded-md px-3 py-2 text-[13px] hover:bg-[#8B1689] hover:text-white transition mt-2"
                      >
                        <i className="ri-shopping-cart-2-line mr-1"></i>
                        Adicionar
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}