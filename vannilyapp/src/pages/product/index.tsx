import { useParams } from 'react-router-dom';
import { products } from '../../data';
import type { Product } from '../../types';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p: Product) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O produto que você procura não existe ou foi removido.
          </p>
          <a 
            href="/" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-w-full max-h-96 object-contain"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {product.title}
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-purple-600">
                R$ {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                R$ {formatPrice(product.originalPrice)}
              </span>
            </div>
            <p className="text-gray-600">
              {product.installments}
            </p>
          </div>

          {product.category === 'jogo' && product.gameInfo && (
            <div className="flex gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600">Idade</p>
                <p className="text-lg font-bold text-purple-600">
                  {product.gameInfo.minAge}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Jogadores</p>
                <p className="text-lg font-bold text-purple-600">
                  {product.gameInfo.players}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Duração</p>
                <p className="text-lg font-bold text-purple-600">
                  {product.gameInfo.duration}
                </p>
              </div>
            </div>
          )}

          <button className="w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors text-lg">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}