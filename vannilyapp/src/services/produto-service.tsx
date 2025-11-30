import { api } from "./api";

export interface ProdutoSearchResult {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

export async function searchProduto(termo: string): Promise<ProdutoSearchResult[]> {
  const response = await api.get("/produto/consultar", {
    params: { termoBusca: termo }
  });
    console.log("RESULTADO BUSCA:", response.data);

  return response.data;
}
