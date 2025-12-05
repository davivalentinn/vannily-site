import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarProdutoPorId,
  type ProdutoCompleto,
} from "../../services/produto-service";
import { ShoppingCart, Heart } from "lucide-react";
import { Button, IconButton } from "../../components/ui";
import LoginModal from "../../features/auth/components/LoginModal";
import { useAuth } from "../../context/authContext";
import LoadingCart from "../../components/Loading/LoadingCart";
import LoadingDots from "../../components/Loading/LoadingDots";

export function ProductPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState<ProdutoCompleto | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const { isAuthenticated } = useAuth();
  

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

  if (loading) return <LoadingCart/>;
  if (!produto) return <p className="p-10 text-center">Produto não encontrado.</p>;

  const precoOriginal =
    produto.desconto && produto.desconto > 0
      ? produto.preco + produto.desconto
      : null;

  const porcentagemDesconto =
    precoOriginal && produto.desconto
      ? Math.round((produto.desconto / precoOriginal) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          message={loginMessage}
        />

        {/* Imagem */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="max-w-full max-h-96 object-contain"
          />
        </div>

        {/* Informações */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{produto.nome}</h1>

          {/* Preço */}
          <div className="space-y-1">
            <span className="text-4xl font-bold text-title">
              R$ {produto.preco.toFixed(2)}
            </span>

            {precoOriginal && (
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-400 line-through">
                  R$ {precoOriginal.toFixed(2)}
                </span>
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                  -{porcentagemDesconto}%
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{produto.descricao}</p>

          {/* Detalhes da Roupa */}
          {produto.roupa && (
            <div className="p-4 bg-purple-50 rounded space-y-2 shadow">
              <h2 className="text-xl font-bold text-title">Detalhes da Roupa</h2>
              <p><strong>Tamanho:</strong> {produto.roupa.tamanho}</p>
              <p><strong>Cor:</strong> {produto.roupa.cor}</p>
              <p><strong>Modelo:</strong> {produto.roupa.modelo}</p>
              <p><strong>Dimensões:</strong> {produto.roupa.dimensoes}</p>
              <p><strong>Nº Modelo:</strong> {produto.roupa.numeroModelo}</p>
            </div>
          )}

          {/* Detalhes do Jogo */}
          {produto.jogo && (
            <div className="p-4 bg-pink-20 rounded space-y-2 shadow">
              <h2 className="text-xl font-bold text-title">Detalhes do Jogo</h2>
              <p><strong>Qtd Pessoas:</strong> {produto.jogo.qtdPessoas}</p>
              <p><strong>Classificação:</strong> {produto.jogo.classificacaoIndicativa}</p>
              <p><strong>Duração:</strong> {produto.jogo.duracao}</p>
              <p><strong>Complexidade:</strong> {produto.jogo.complexidade}</p>
            </div>
          )}

          {/* Quantidade */}
          <div className="flex items-center gap-4">
            <p className="font-semibold">Quantidade:</p>
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-1 text-xl hover:bg-gray-100"
                onClick={() => setQuantidade(q => Math.max(1, q - 1))}
              >-</button>
              <span className="px-4">{quantidade}</span>
              <button
                className="px-3 py-1 text-xl hover-bg-gray-100"
                onClick={() => setQuantidade(q => q + 1)}
              >+</button>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              variant="button"
              size="md"
            >Comprar agora</Button>
            <Button
              variant="button"
              size="md"
              className="flex gap-2 items-center justify-center"
            >
              <ShoppingCart />
              Adicionar ao carrinho
            </Button>

            <IconButton
              variant="danger"
              active={favorites.includes(produto.id)}
              onClick={() => toggleFavorite(produto.id)}
              aria-label="Adicionar aos favoritos"
            >
              <Heart className={`w-6 h-6 ${favorites.includes(produto.id) ? 'fill-current' : ''}`} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
