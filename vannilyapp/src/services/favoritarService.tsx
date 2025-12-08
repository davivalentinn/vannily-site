// services/favorito-service.ts
import { api } from "./api";

export interface FavoritoCreateDto {
  usuarioId: number;
  produtoId: number;
}

export interface FavoritoGetDto {
  id: number;
  usuarioId: number;
  produtoId: number;
  produtoNome: string;
  produtoImagem: string;
}

/**
 * Adiciona um produto aos favoritos
 */
export async function adicionarFavorito(dto: FavoritoCreateDto): Promise<FavoritoGetDto> {
  const response = await api.post("/favoritos", dto);
  return response.data;
}

/**
 * Lista todos os favoritos de um usuário
 */
export async function listarFavoritos(usuarioId: number): Promise<FavoritoGetDto[]> {
  const response = await api.get(`/favoritos/${usuarioId}`);
  return response.data;
}

/**
 * Remove um produto específico dos favoritos
 */
export async function removerFavorito(usuarioId: number, produtoId: number): Promise<void> {
  await api.delete(`/favoritos/${usuarioId}/${produtoId}`);
}

/**
 * Limpa todos os favoritos de um usuário
 */
export async function limparFavoritos(usuarioId: number): Promise<void> {
  await api.delete(`/favoritos/limpar/${usuarioId}`);
}