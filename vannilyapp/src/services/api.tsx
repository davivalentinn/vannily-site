import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 10000,
});

const PUBLIC_ROUTES = ["/login/autenticar", "/usuarios/inserir"];

const cleanUrl = (url?: string): string => {
  if (!url) return "";
  try {
    return new URL(url, "http://localhost").pathname;
  } catch {
    return url;
  }
};

const isPublicRoute = (url?: string): boolean => {
  const path = cleanUrl(url);
  return PUBLIC_ROUTES.includes(path);
};




const isValidToken = (token: string | null): boolean => {
  return !!token && token !== "null" && token !== "undefined" && token.length > 20;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    // ✅ SEMPRE verificar rotas públicas primeiro
    if (isPublicRoute(config.url)) {
      delete config.headers.Authorization;
      return config;
    }

    // ✅ Pegar token do localStorage na hora da requisição
    const token = localStorage.getItem("token");

    if (token && isValidToken(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    else {
      // Limpar token inválido
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // ✅ Limpar tudo em caso de 401
      localStorage.clear();

      if (!isPublicRoute(error.config?.url)) {
        window.location.href = "/account/login";
      }
    }

    return Promise.reject(error);
  }
);