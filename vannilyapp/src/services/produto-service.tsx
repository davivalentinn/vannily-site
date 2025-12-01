import { api } from "./api";

export interface ProdutoSearchResult {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
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

export async function buscarProdutoPorId(id: number): Promise<ProdutoCompleto> {
  const response = await api.get(`/produto/completo/${id}`);
  return response.data as ProdutoCompleto;
}

export async function searchProduto(termo: string): Promise<ProdutoSearchResult[]> {
  const response = await api.get("/produto/consultar", {
    params: { termoBusca: termo },
  });
  return response.data;
}
export async function listarPromocoes(): Promise<ProdutoGetDto[]> {
  const response = await api.get("/produto/promocoes");
  return response.data;
}
