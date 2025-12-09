import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarProdutoPorId,
  listarProdutosPorNomeCategoria,
  listarProdutosRecentes,
  type ProdutoCompleto,
} from "../../services/produto-service";
import { 
  adicionarFavorito, 
  removerFavorito, 
  listarFavoritos 
} from "../../services/favoritarService";
import { 
  adicionarItem 
} from "../../services/cartService";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
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
  const [adicionandoCarrinho, setAdicionandoCarrinho] = useState(false);
  const [adicionandoFavorito, setAdicionandoFavorito] = useState(false);
  const { isAuthenticated, user, userId } = useAuth();

  // Carregar favoritos do usuário
  useEffect(() => {
    if (isAuthenticated && userId) {
      carregarFavoritos();
    }
  }, [isAuthenticated, userId]);

  const carregarFavoritos = async () => {
    if (!userId) return;
    
    try {
      const favoritosData = await listarFavoritos(userId);
      const favoritosIds = favoritosData.map(fav => fav.produtoId);
      setFavorites(favoritosIds);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };

  const toggleFavorite = async (productId: number) => {
    console.log('Toggle Favorito - UserID:', userId, 'ProductID:', productId);
    
    if (!isAuthenticated || !userId) {
      setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
      setShowLoginModal(true);
      return;
    }

    setAdicionandoFavorito(true);
    
    const isFavorito = favorites.includes(productId);
    
    // Atualização otimista da UI
    setFavorites(prev =>
      isFavorito
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    try {
      console.log('É favorito?', isFavorito);
      
      if (isFavorito) {
        console.log('Removendo favorito...');
        await removerFavorito(userId, productId);
        alert('Produto removido dos favoritos!');
      } else {
        console.log('Adicionando favorito...');
        const result = await adicionarFavorito({
          usuarioId: userId,
          produtoId: productId,
        });
        console.log('Resultado:', result);
        alert('Produto adicionado aos favoritos!');
      }
    } catch (error: any) {
      console.error("Erro ao atualizar favorito:", error);
      
      // Reverter em caso de erro
      setFavorites(prev =>
        isFavorito
          ? [...prev, productId]
          : prev.filter(id => id !== productId)
      );
      
      // Mensagens de erro específicas
      if (error?.response?.status === 403) {
        setLoginMessage("Sua sessão expirou. Por favor, faça login novamente.");
        setShowLoginModal(true);
      } else if (error?.response?.status === 401) {
        setLoginMessage("Você precisa estar logado para adicionar produtos aos favoritos.");
        setShowLoginModal(true);
      } else {
        alert(`Erro ao atualizar favoritos: ${error}`);
      }
    } finally {
      setAdicionandoFavorito(false);
    }
  };

  const adicionarAoCarrinho = async () => {
    console.log('Adicionar ao Carrinho - UserID:', userId, 'ProductID:', produto?.id, 'Quantidade:', quantidade);
    
    if (!isAuthenticated || !userId) {
      setLoginMessage("Você precisa estar logado para adicionar produtos ao carrinho.");
      setShowLoginModal(true);
      return;
    }

    if (!produto) {
      console.error('Produto não encontrado');
      return;
    }

    // Validação de tamanho para roupas
    if (produto.roupa && !tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }

    setAdicionandoCarrinho(true);

    try {
      console.log('Chamando adicionarItem...', { userId, produtoId: produto.id, quantidade });
      const result = await adicionarItem(userId, produto.id, quantidade);
      console.log('Resultado do carrinho:', result);
      alert(`${quantidade} ${quantidade > 1 ? 'unidades adicionadas' : 'unidade adicionada'} ao carrinho!`);
      setQuantidade(1); // Reset quantidade após adicionar
    } catch (error: any) {
      console.error("Erro ao adicionar ao carrinho:", error);
      
      if (error?.response?.status === 403) {
        setLoginMessage("Sua sessão expirou. Por favor, faça login novamente.");
        setShowLoginModal(true);
      } else if (error?.response?.status === 401) {
        setLoginMessage("Você precisa estar logado para adicionar produtos ao carrinho.");
        setShowLoginModal(true);
      } else {
        alert(`Erro ao adicionar produto ao carrinho: ${error}`);
      }
    } finally {
      setAdicionandoCarrinho(false);
    }
  };

  const comprarAgora = async () => {
    console.log('Comprar Agora - UserID:', userId, 'ProductID:', produto?.id);
    
    if (!isAuthenticated || !userId) {
      setLoginMessage("Você precisa estar logado para realizar uma compra.");
      setShowLoginModal(true);
      return;
    }

    if (!produto) {
      console.error('Produto não encontrado');
      return;
    }

    // Validação de tamanho para roupas
    if (produto.roupa && !tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de continuar.");
      return;
    }

    try {
      console.log('Adicionando ao carrinho antes de redirecionar...');
      const result = await adicionarItem(userId, produto.id, quantidade);
      console.log('Produto adicionado:', result);
      // Redirecionar para o carrinho ou checkout
      window.location.href = "/carrinho";
    } catch (error: any) {
      console.error("Erro ao processar compra:", error);
      
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        setLoginMessage("Você precisa estar logado para realizar uma compra.");
        setShowLoginModal(true);
      } else {
        alert(`Erro ao processar compra: ${error}`);
      }
    }
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
                {produto.unidades > 0 && (
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
                <p className="font-semibold mb-3">
                  Tamanhos: {!tamanhoSelecionado && <span className="text-red-500 text-sm">*Obrigatório</span>}
                </p>
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
              <button
                onClick={comprarAgora}
                disabled={produto.unidades === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {produto.unidades === 0 ? 'Indisponível' : 'Comprar agora'}
              </button>
              
              <button
                onClick={() => toggleFavorite(produto.id)}
                disabled={adicionandoFavorito}
                aria-label="Adicionar aos favoritos"
                className="w-14 h-14 border-2 border-purple-600 rounded flex items-center justify-center disabled:opacity-50 hover:bg-purple-50 transition-colors"
              >
                <Heart 
                  className={`w-6 h-6 ${
                    favorites.includes(produto.id) 
                      ? 'fill-purple-600 text-purple-600' 
                      : 'text-purple-600'
                  }`} 
                />
              </button>
              
              <button
                onClick={adicionarAoCarrinho}
                disabled={adicionandoCarrinho || produto.unidades === 0}
                className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Informações de Vendedor e Envio */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Vendido por:</span> {produto.fornecedor}
              </p>
              <p>
                <span className="font-semibold">Enviado por:</span> {produto.transportadora}
              </p>
              <p>
                <span className="font-semibold">Unidades disponíveis:</span> {produto.unidades}
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
                    onClick={() => setQuantidade(q => Math.min(produto.unidades, q + 1))}
                    disabled={quantidade >= produto.unidades}
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