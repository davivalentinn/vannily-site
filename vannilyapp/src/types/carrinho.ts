export interface CarrinhoItem {
  id: number;
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

export interface Carrinho {
  usuarioId: number;
  itens: CarrinhoItem[];
  total: number;
}
