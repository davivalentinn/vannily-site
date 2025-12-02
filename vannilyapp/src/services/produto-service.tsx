import { api } from "./api";

export interface ProdutoSearchResult extends ProdutoGetDto {
  jogo?: ProdutoJogoGetDto;
  roupa?: ProdutoRoupaGetDto;
}


// DTOs iguais aos do backend
export interface ProdutoGetDto {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  desconto: number;
  unidades: number;
  descricao: string;
  fornecedor: string;
  transportadora: string;
  categoriaNome: string;
  tema: string | null;
  genero: string | null;
}

export interface ProdutoJogoGetDto {
  id: number;
  produtoId: number;
  tema: string;
  genero: string;
  qtdPessoas: number;
  classificacaoIndicativa: string;
  duracao: string;
  tipoBaralho: string;
  tamanhoCartas: string;
  materialCartas: string;
  tipoJogo: string;
  numeroCartas: number;
  ilustrado: boolean;
  qtdPecas: number;
  tamanhoTabuleiro: string;
  materialTabuleiro: string;
  tipoTabuleiro: string;
  complexidade: string;
  possuiCartas: boolean;
}

export interface ProdutoRoupaGetDto {
  id: number;
  produtoId: number;
  tamanho: string;
  cor: string;
  dimensoes: string;
  numeroModelo: string;
  tipoCapuz: boolean;
  espessuraTecido: string;
  materialForro: string;
  possuiZiper: boolean;
  resistenteAgua: boolean;
  tipoGola: string;
  tipoManga: string;
  tecido: string;
  possuiBolsos: boolean;
  estampaPersonalizada: boolean;
  modelo: string;
}

// produto completo vindo do backend
export interface ProdutoCompleto extends ProdutoGetDto {
  jogo?: ProdutoJogoGetDto;
  roupa?: ProdutoRoupaGetDto;
}

/**
 * Busca um produto completo por ID (com dados de jogo/roupa se houver)
 */
export async function buscarProdutoPorId(id: number): Promise<ProdutoCompleto> {
  const response = await api.get(`/produto/completo/${id}`);
  return response.data as ProdutoCompleto;
}

/**
 * Busca produtos por termo de pesquisa
 */
export async function searchProduto(termo: string): Promise<ProdutoSearchResult[]> {
  const response = await api.get("/produto/consultar", {
    params: { termoBusca: termo },
  });
  return response.data;
}

/**
 * Lista todos os produtos em promoção (com desconto > 0)
 */
export async function listarPromocoes(): Promise<ProdutoGetDto[]> {
  const response = await api.get("/produto/promocoes");
  return response.data;
}

/**
 * 🆕 Lista produtos por ID da categoria
 */
export async function listarProdutosPorCategoria(categoriaId: number): Promise<ProdutoGetDto[]> {
  const response = await api.get(`/produto/categoria/${categoriaId}`);
  return response.data;
}

/**
 * 🆕 Lista produtos por NOME da categoria (ex: "Roupas", "Jogos")
 */
export async function listarProdutosPorNomeCategoria(nomeCategoria: string): Promise<ProdutoGetDto[]> {
  const response = await api.get(`/produto/categoria/nome/${nomeCategoria}`);
  return response.data;
}
 
/**
 * 🆕 Lista produtos recentes (últimos adicionados)
 */
export async function listarProdutosRecentes(limite: number = 10): Promise<ProdutoGetDto[]> {
  const response = await api.get("/produto/recentes", {
    params: { limite },
  });
  return response.data;
}

/**
 * 🆕 Lista TODOS os produtos disponíveis
 */
export async function listarTodosProdutos(): Promise<ProdutoGetDto[]> {
  const response = await api.get("/produto/todos");
  return response.data;
}

/**
 * Filtra produtos por tema e/ou gênero
 */
export async function filtrarProdutos(tema?: string, genero?: string): Promise<ProdutoGetDto[]> {
  const response = await api.get("/produto/filtrar", {
    params: { tema, genero },
  });
  return response.data;
}

