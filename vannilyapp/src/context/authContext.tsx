import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  user: string | null;
  setToken: (value: string | null) => void;
  setUser: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("usuario")); // pegar usuário salvo no localStorage

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
