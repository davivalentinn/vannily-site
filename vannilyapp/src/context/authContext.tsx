import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  user: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUserState] = useState<string | null>(() =>
    localStorage.getItem("usuario")
  );

  // Sincronizar token com localStorage automaticamente
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Sincronizar usuário com localStorage automaticamente
  useEffect(() => {
    if (user) localStorage.setItem("usuario", user);
    else localStorage.removeItem("usuario");
  }, [user]);

  const login = useCallback((newToken: string, newUser: string) => {
    setTokenState(newToken);
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    setTokenState(null);
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
