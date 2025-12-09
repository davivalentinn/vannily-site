// context/AuthContext.tsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  user: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  login: (token: string, nome: string, id: number, email: string, tipoUsuario: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => localStorage.getItem("nome")); // MUDOU: era "usuario"
  const [userId, setUserId] = useState<number | null>(() => {
    const storedId = localStorage.getItem("userId"); // MUDOU: era "id"
    return storedId ? Number(storedId) : null;
  });

  // sincroniza token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // sincroniza usuário/nome
  useEffect(() => {
    if (user) localStorage.setItem("nome", user); // MUDOU: era "usuario"
    else localStorage.removeItem("nome");
  }, [user]);

  // sincroniza ID
  useEffect(() => {
    if (userId !== null) localStorage.setItem("userId", String(userId)); // MUDOU: era "id"
    else localStorage.removeItem("userId");
  }, [userId]);

  const login = useCallback((
    newToken: string, 
    nome: string, 
    id: number,
    email: string,
    tipoUsuario: string
  ) => {
    // Salvar tudo no localStorage
    setToken(newToken);
    setUser(nome);
    setUserId(id);
    
    localStorage.setItem("token", newToken);
    localStorage.setItem("nome", nome);
    localStorage.setItem("userId", id.toString());
    localStorage.setItem("email", email);
    localStorage.setItem("tipoUsuario", tipoUsuario);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setUserId(null);
    
    // Limpar tudo
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("sobrenome");
    localStorage.removeItem("avatar");
    localStorage.removeItem("usuario"); // Limpar versão antiga
    localStorage.removeItem("id"); // Limpar versão antiga
    localStorage.removeItem("role"); // Limpar versão antiga
  }, []);

  const isAuthenticated = !!token && !!user && userId !== null;

  return (
    <AuthContext.Provider
      value={{ token, user, userId, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}