import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarProdutoPorId,
  listarProdutosPorNomeCategoria,
  listarProdutosRecentes,
  type ProdutoCompleto,
} from "../../services/produto-service";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { Button, IconButton } from "../../components/ui";
import LoginModal from "../../features/auth/components/LoginModal";
import { useAuth } from "../../context/authContext";
import LoadingCart from "../../components/Loading/LoadingCart";
import ProductSlider from "../../components/sections/ProductSlider/ProductSlider";

export function ProductPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState<ProdutoCompleto | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const { isAuthenticated } = useAuth();

  const toggleFavorite = (productId: number) => {
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

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let tries = 0;
    const maxTries = 30;
    const interval = setInterval(() => {
      const el = document.querySelector(hash);
      if (el) {
        const headerOffset = 200;
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        clearInterval(interval);
      } else if (++tries >= maxTries) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!id) return;

    async function carregarProduto() {
      setLoading(true);
      const produtoBase = await buscarProdutoPorId(Number(id));
      setProduto(produtoBase);
      setLoading(false);
    }

    carregarProduto();
  }, [id]);

  if (loading) return <LoadingCart />;
  if (!produto) return <p className="p-10 text-center">Produto não encontrado.</p>;

  const precoOriginal =
    produto.desconto && produto.desconto > 0
      ? produto.preco + produto.desconto
      : null;

  const porcentagemDesconto =
    precoOriginal && produto.desconto
      ? Math.round((produto.desconto / precoOriginal) * 100)
      : 0;

  // Imagens do produto (principal + miniaturas)
  const imagens = [produto.imagem, produto.imagem, produto.imagem];
  
  // Tamanhos disponíveis para roupas
  const tamanhos = produto.roupa 
    ? ["P", "M", "G", "GG", "8", "10", "12"]
    : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          message={loginMessage}
        />

        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          Início / Roupas / Moletom / {produto.nome}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden">
          {/* Galeria de Imagens */}
          <div className="p-8">
            <div className="flex gap-4">
              {/* Miniaturas */}
              <div className="flex flex-col gap-3">
                {imagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagemSelecionada(idx)}
                    className={`w-20 h-20 bg-gray-100 rounded border-2 overflow-hidden ${
                      imagemSelecionada === idx ? 'border-purple-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${produto.nome} - imagem ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Imagem Principal */}
              <div className="flex-1 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <img
                  src={imagens[imagemSelecionada]}
                  alt={produto.nome}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {produto.nome}
            </h1>

            {/* Preço */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-purple-600">
                  R$ {produto.preco.toFixed(2)}
                </span>
                {porcentagemDesconto > 0 && (
                  <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded">
                    EM ESTOQUE
                  </span>
                )}
              </div>
              
              {precoOriginal && (
                <p className="text-gray-600">
                  ou 6x de R$ {(produto.preco / 6).toFixed(2)} sem juros
                </p>
              )}
            </div>

            {/* Cor */}
            {produto.roupa && (
              <div>
                <p className="font-semibold mb-2">
                  Cor: <span className="font-normal">{produto.roupa.cor}</span>
                </p>
              </div>
            )}

            {/* Tamanhos */}
            {tamanhos.length > 0 && (
              <div>
                <p className="font-semibold mb-3">Tamanhos:</p>
                <div className="flex flex-wrap gap-2">
                  {tamanhos.map((tam) => (
                    <button
                      key={tam}
                      onClick={() => setTamanhoSelecionado(tam)}
                      className={`w-12 h-12 border-2 rounded font-semibold transition-colors ${
                        tamanhoSelecionado === tam
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {tam}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="button"
                size="md"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded"
              >
                Comprar agora
              </Button>
              
              <IconButton
                variant="danger"
                active={favorites.includes(produto.id)}
                onClick={() => toggleFavorite(produto.id)}
                aria-label="Adicionar aos favoritos"
                className="w-14 h-14 border-2 border-purple-600 rounded flex items-center justify-center"
              >
                <Heart 
                  className={`w-6 h-6 ${
                    favorites.includes(produto.id) 
                      ? 'fill-purple-600 text-purple-600' 
                      : 'text-purple-600'
                  }`} 
                />
              </IconButton>
              
              <IconButton
                variant="button"
                className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded flex items-center justify-center"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </IconButton>
            </div>

            {/* Informações de Vendedor e Envio */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Vendido por:</span> {produto.fornecedor}
              </p>
              <p>
                <span className="font-semibold">Enviado por:</span> {produto.transportadora}
              </p>
            </div>

            {/* Calcular Frete */}
            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Quantidade:</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border-2 rounded">
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-semibold">{quantidade}</span>
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setQuantidade(q => q + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button className="text-purple-600 font-semibold hover:underline">
                  📦 Calcular o valor do frete
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Seu cep"
                  className="w-full px-4 py-2 border rounded"
                />
                <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700">
                  Calcular
                </button>
              </div>

              {/* Opções de Entrega */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">PAC</p>
                    <p className="text-gray-600">Chega até 08/05</p>
                  </div>
                  <p className="font-semibold">R$ 27,49</p>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">SEDEX</p>
                    <p className="text-gray-600">Chega até 18/05</p>
                  </div>
                  <p className="font-semibold">R$ 60,48</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-white rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Descrição</h2>
          <p className="text-gray-700 leading-relaxed">{produto.descricao}</p>

          {/* Tags */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {produto.fornecedor && (
                <span className="px-4 py-2 border rounded-full text-sm">
                  {produto.fornecedor}
                </span>
              )}
              {produto.tema && (
                <span className="px-4 py-2 border rounded-full text-sm">
                  {produto.tema}
                </span>
              )}
              {produto.genero && (
                <span className="px-4 py-2 border rounded-full text-sm">
                  {produto.genero}
                </span>
              )}
              {produto.categoriaNome && (
                <span className="px-4 py-2 border rounded-full text-sm">
                  {produto.categoriaNome}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="mt-12">
          <ProductSlider
            title={produto.roupa ? "ROUPAS RELACIONADAS!" : "JOGOS RELACIONADOS"}
            fetchFunction={() => 
              produto.categoriaNome 
                ? listarProdutosPorNomeCategoria(produto.categoriaNome)
                : listarProdutosRecentes(8)
            }
            itemsPerView={4}
          />
        </div>
      </div>
    </div>
  );
}