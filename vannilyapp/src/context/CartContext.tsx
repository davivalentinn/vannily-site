// context/CartContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { 
  getCarrinho, 
  adicionarItem, 
  removerItem, 
  limparCarrinho, 
  atualizarQuantidade 
} from "../services/cartService";
import type { Carrinho } from "../types/carrinho";
import { useAuth } from "../context/authContext";

interface CartContextType {
  carrinho: Carrinho | null;
  loading: boolean;
  addItem: (produtoId: number, quantidade?: number) => Promise<void>;
  removeItem: (produtoId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (produtoId: number, quantidade: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { userId, isAuthenticated } = useAuth();

  const [carrinho, setCarrinho] = useState<Carrinho | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarCarrinho() {
    if (!userId || !isAuthenticated) {
      setCarrinho(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getCarrinho(userId);
      setCarrinho(data);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addItem(produtoId: number, quantidade = 1) {
    if (!userId) return;
    try {
      const data = await adicionarItem(userId, produtoId, quantidade);
      setCarrinho(data);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      throw error;
    }
  }

  async function removeItem(produtoId: number) {
    if (!userId) return;
    try {
      const data = await removerItem(userId, produtoId);
      setCarrinho(data);
    } catch (error) {
      console.error("Erro ao remover item:", error);
      throw error;
    }
  }

  async function clearCart() {
    if (!userId) return;
    try {
      const data = await limparCarrinho(userId);
      setCarrinho(data);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      throw error;
    }
  }

  async function updateQuantity(produtoId: number, quantidade: number) {
    if (!userId) return;
    if (quantidade < 1) return; // Não permite quantidade menor que 1
    try {
      const data = await atualizarQuantidade(userId, produtoId, quantidade);
      setCarrinho(data);
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      throw error;
    }
  }

  useEffect(() => {
    carregarCarrinho();
  }, [userId]);

  return (
    <CartContext.Provider value={{ 
      carrinho, 
      loading, 
      addItem, 
      removeItem, 
      clearCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do <CartProvider>");
  return context;
}