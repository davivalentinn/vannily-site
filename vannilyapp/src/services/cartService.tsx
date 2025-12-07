import { api } from "./api";
import type { Carrinho } from "../types/carrinho";

const API_URL = "/carrinho";

export async function getCarrinho(usuarioId: number): Promise<Carrinho> {
  const { data } = await api.get(`${API_URL}/${usuarioId}`);
  return data;
}

export async function adicionarItem(
  usuarioId: number,
  produtoId: number,
  quantidade = 1
): Promise<Carrinho> {
  const { data } = await api.post(`${API_URL}/${usuarioId}/adicionar`, {
    produtoId,
    quantidade,
  });
  return data;
}

export async function removerItem(
  usuarioId: number,
  produtoId: number
): Promise<Carrinho> {
  const { data } = await api.delete(`${API_URL}/${usuarioId}/remover/${produtoId}`);
  return data;
}

export async function limparCarrinho(usuarioId: number): Promise<Carrinho> {
  const { data } = await api.delete(`${API_URL}/${usuarioId}/limpar`);
  return data;
}

export async function atualizarQuantidade(
  usuarioId: number,
  produtoId: number,
  quantidade: number
): Promise<Carrinho> {
  const { data } = await api.put(`${API_URL}/${usuarioId}/atualizar/${produtoId}`, {
    quantidade,
  });
  return data;
}