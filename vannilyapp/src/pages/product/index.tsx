import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarProdutoPorId,
  type ProdutoCompleto,
} from "../../services/produto-service";
import { ShoppingCart, Heart } from "lucide-react";

export function ProductPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState<ProdutoCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);

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

  if (loading) return <p className="p-10 text-center">Carregando...</p>;
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
            <span className="text-4xl font-bold text-purple-600">
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
              <h2 className="text-xl font-bold text-purple-700">Detalhes da Roupa</h2>
              <p><strong>Tamanho:</strong> {produto.roupa.tamanho}</p>
              <p><strong>Cor:</strong> {produto.roupa.cor}</p>
              <p><strong>Modelo:</strong> {produto.roupa.modelo}</p>
              <p><strong>Dimensões:</strong> {produto.roupa.dimensoes}</p>
              <p><strong>Nº Modelo:</strong> {produto.roupa.numeroModelo}</p>
            </div>
          )}

          {/* Detalhes do Jogo */}
          {produto.jogo && (
            <div className="p-4 bg-purple-50 rounded space-y-2 shadow">
              <h2 className="text-xl font-bold text-purple-700">Detalhes do Jogo</h2>
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
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              Comprar Agora
            </button>

            <button className="flex items-center gap-2 border px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <ShoppingCart />
              Adicionar
            </button>

            <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
              <Heart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
