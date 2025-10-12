import React from 'react';
import { Dropdown } from './Dropdown';
import { catalogoItems, modaGeekItems, boardGamesItems } from './menuData';
import { Link } from 'react-router-dom';
export const SubMenu: React.FC = () => {
  return (
    <div className="w-full bg-background border-gray-200">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-1">
          {/* Categorias - Esquerda */}
          <div className="flex items-center gap-6">
            <Dropdown label="Catálogo" items={catalogoItems} />
            
            <a href='#' 
              className=" px-2 py-2 hover:text-white/90 transition-colors duration-200"
            >
              Mais Vendidos
            </a>
            
            <Dropdown label="Moda Geek" items={modaGeekItems} />
            
            <Dropdown label="BoardGames" items={boardGamesItems} />
            
            <a href='#' 
              className="px-2 py-2  hover:text-white/90 transition-colors duration-200"
            >
              Destaques
            </a>
          </div>

          {/* Informações do Site - Direita */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="#" 
              className="px-2 py-2 text-sm hover:text-white/90 transition-colors duration-200"
            >
              Meus pedidos
            </Link>
            <Link to="#" 
              className="px-2 py-2 text-sm hover:text-white/90 transition-colors duration-200"
            >
              Devoluções e reembolso
            </Link>
            <Link to="#" 
              className="px-2 py-2 text-sm hover:text-white/90 transition-colors duration-200"
            >
              Sobre nós
            </Link>
            <Link to="#" 
              className="px-2 py-2 text-sm hover:text-white/90 transition-colors duration-200"
            >
              Contato
            </Link>
            <Link to="#"  
              className="px-2 py-2 text-sm hover:text-white/90 transition-colors duration-200"
            >
              Suporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};