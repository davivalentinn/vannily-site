// services/login-service.ts
import { api } from "./api";

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  token: string;
  email: string;
  tipoUsuario: string;
  nome: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login/autenticar", data);
  console.log("LOGIN RESPONSE:", response.data);
  return response.data;
}
