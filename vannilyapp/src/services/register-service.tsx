import { api } from "./api";

export interface RegisterRequest {
  nome: string;
  numeroTelefone: string;
  email: string;
  usuario: string;
  senha: string;
  tipoUsuario: string;
}

export interface RegisterResponse {
  id: number;
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/usuarios/inserir", data);
  return response.data;
}