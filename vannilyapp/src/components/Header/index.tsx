import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { Search } from "../Search";
import { ButtonRegisterOrLogin } from "../ButtonRegisterOrLogin";
import { SubMenu } from "../SubMenuDropdown";
import { UserLoggedHeader } from "../../features/auth/components/login/UserLoggedHeader";
import { Heart, ShoppingCart, X, Menu, ChevronRight } from "lucide-react";
import { catalogoItems, modaGeekItems, boardGamesItems } from '../SubMenuDropdown/menuData';

// Componente de seção de categoria
const CategorySection = ({ title, items, onClose }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 px-4">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item, index) => (
          !item.isHeader && (
            <Link
              key={index}
              to={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              <span className="text-sm">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

const MobileSidebar = ({ isOpen, onClose, isAuthenticated }) => {
  return (
    <>
      {/* Overlay escuro */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar que desliza da esquerda (estilo Amazon) */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header do Sidebar */}
        <div className="flex items-center justify-between p-6 border-b bg-primary sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="pb-6">
          {/* Login/Perfil - Topo */}
          <div className="p-4 bg-gray-50 border-b">
            {isAuthenticated ? (
              <div onClick={onClose}>
                <UserLoggedHeader />
              </div>
            ) : (
              <div onClick={onClose}>
                <ButtonRegisterOrLogin />
              </div>
            )}
          </div>

          {/* Links Rápidos */}
          <div className="py-4 border-b">
            <Link
              to="/favorites"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Heart className="w-5 h-5 text-title" />
              <span className="font-medium text-gray-800">Favoritos</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <ShoppingCart className="w-5 h-5 text-title" />
              <span className="font-medium text-gray-800">Carrinho</span>
            </Link>
          </div>

          {/* Links de Navegação */}
          <div className="py-4 border-b space-y-1">
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="font-medium text-gray-800">Mais Vendidos</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="font-medium text-gray-800">Destaques</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Categorias Expandidas */}
          <div className="py-4">
            <CategorySection 
              title="Catálogo" 
              items={catalogoItems} 
              onClose={onClose}
            />
            <CategorySection 
              title="Moda Geek" 
              items={modaGeekItems} 
              onClose={onClose}
            />
            <CategorySection 
              title="Board Games" 
              items={boardGamesItems} 
              onClose={onClose}
            />
          </div>

          {/* Informações do Site */}
          <div className="py-4 border-t space-y-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 px-4">
              Ajuda & Configurações
            </h3>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-sm">Meus Pedidos</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-sm">Devoluções e Reembolso</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-sm">Sobre Nós</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-sm">Contato</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-sm">Suporte</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export function Header() {
  const { isAuthenticated } = useAuth(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-primary">
      <nav className="w-full max-w-7xl h-22 items-center flex justify-between mx-auto gap-4">
        {/* Logo */}
        <div className="py-2 flex items-center gap-2 px-4 pb-1">
          {/* Menu Hambúrguer (mostra só no mobile) - MOVIDO PARA ANTES DA LOGO */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 bg-button rounded-lg hover:bg-button/90 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <Link to="/">
            <img className="h-12 lg:h-20" src="/logo.svg" alt="Logo" />
          </Link>
        </div>

        {/* Search - ajustado para ser responsivo */}
        <div className="hidden md:block flex-1 max-w-2xl">
          <Search />
        </div>

        {/* Botões Desktop (esconde no mobile) */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            className="bg-button p-2 px-3 rounded-lg hover:bg-button/90 transition-colors"
            to="/favorites"
            aria-label="Favoritos"
          >
            <i className="ri-heart-add-2-line"></i>
          </Link>

          <Link
            className="bg-button px-3 py-2 rounded-lg hover:bg-button/90 transition-colors"
            to="/cart"
            aria-label="Carrinho"
          >
            <i className="ri-shopping-cart-line"></i>
          </Link>

          {isAuthenticated ? <UserLoggedHeader /> : <ButtonRegisterOrLogin />}
        </div>

        {/* Ícones Mobile - Favoritos e Carrinho */}
        <div className="lg:hidden flex items-center gap-2 px-4 pb-1">
          <Link
            to="/favorites"
            className="p-2 bg-button rounded-lg hover:bg-button/90 transition-colors"
            aria-label="Favoritos"
          >
            <Heart className="w-5 h-5 text-white" />
          </Link>

          <Link
            to="/cart"
            className="p-2 bg-button rounded-lg hover:bg-button/90 transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </Link>
        </div>
      </nav>

      {/* Search Mobile */}
      <div className="md:hidden px-4 pb-3">
        <Search />
      </div>

      {/* SubMenu Desktop (esconde no mobile) */}
      <div className="hidden lg:block">
        <SubMenu />
      </div>

      {/* Sidebar Mobile */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
}