import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const MobileSubMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-gray-50 border-t border-gray-200 text-gray-700 hover:bg-gray-100"
      >
        Menu de Categorias
        <ChevronDown 
          size={16} 
          className={`float-right mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <div className="font-semibold text-gray-800 mb-2">Categorias</div>
            <a href="#" className="block py-2 text-gray-600 hover:text-purple-600">Catálogo</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-purple-600">Mais Vendidos</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-purple-600">Moda Geek</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-purple-600">BoardGames</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-purple-600">Destaques</a>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="font-semibold text-gray-800 mb-2">Informações</div>
              <a href="#" className="block py-1 text-sm text-gray-600 hover:text-purple-600">Meus pedidos</a>
              <a href="#" className="block py-1 text-sm text-gray-600 hover:text-purple-600">Devoluções e reembolso</a>
              <a href="#" className="block py-1 text-sm text-gray-600 hover:text-purple-600">Sobre nós</a>
              <a href="#" className="block py-1 text-sm text-gray-600 hover:text-purple-600">Contato</a>
              <a href="#" className="block py-1 text-sm text-gray-600 hover:text-purple-600">Suporte</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};