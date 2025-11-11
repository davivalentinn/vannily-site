import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
