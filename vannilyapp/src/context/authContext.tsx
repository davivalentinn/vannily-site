// context/AuthContext.tsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  user: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  login: (token: string, user: string, id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => localStorage.getItem("usuario"));
  const [userId, setUserId] = useState<number | null>(() => {
    const storedId = localStorage.getItem("id");
    return storedId ? Number(storedId) : null;
  });

  // sincroniza token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // sincroniza usuário
  useEffect(() => {
    if (user) localStorage.setItem("usuario", user);
    else localStorage.removeItem("usuario");
  }, [user]);

  // sincroniza ID
  useEffect(() => {
    if (userId !== null) localStorage.setItem("id", String(userId));
    else localStorage.removeItem("id");
  }, [userId]);

  const login = useCallback((newToken: string, newUser: string, id: number) => {
    setToken(newToken);
    setUser(newUser);
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setUserId(null);
    localStorage.clear();
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
