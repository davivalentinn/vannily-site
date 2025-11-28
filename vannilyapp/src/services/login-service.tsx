import { api } from "./api";

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  email: string;
  tipo_usuario: string;
  nome: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login/autenticar", data);

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("email", response.data.email);
  localStorage.setItem("tipo_usuario", response.data.tipo_usuario);
  localStorage.setItem("usuario", response.data.nome);
  console.log("LOGIN RESPONSE:", response.data);

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("tipo_usuario");
  localStorage.removeItem("nome");
}
