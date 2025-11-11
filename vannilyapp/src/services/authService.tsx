import { api } from "./api";

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  email: string;
  role: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/login/autenticar", data);
  
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("email", response.data.email);
  localStorage.setItem("role", response.data.role);

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}
