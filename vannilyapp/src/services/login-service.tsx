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
  nome: string;
  usuario: string; // ⬅️ ADICIONADO
  tipoUsuario: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login/autenticar", data);
  
  console.log("LOGIN RESPONSE:", response.data);
  
  // Salvar todos os dados no localStorage
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.id.toString());
  localStorage.setItem("email", response.data.email);
  localStorage.setItem("nome", response.data.nome);
  localStorage.setItem("usuario", response.data.usuario); // ⬅️ ADICIONADO
  localStorage.setItem("tipoUsuario", response.data.tipoUsuario);
  
  return response.data;
}

export function logout() {
  // Limpar todos os dados do usuário
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("nome");
  localStorage.removeItem("usuario"); // ⬅️ ADICIONADO
  localStorage.removeItem("tipoUsuario");
  localStorage.removeItem("sobrenome");
  localStorage.removeItem("avatar");
  localStorage.removeItem("role");
}