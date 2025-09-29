import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
    // Controla se o dropdown está aberto ou fechado
    const [isOpen, setIsOpen] = useState(false);
    
    // Armazena o ID do timeout para cancelar o fechamento se necessário
    const timeoutRef = useRef<number | null>(null);

    // Abre o dropdown e cancela qualquer fechamento pendente
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Fecha o dropdown após 150ms (permite mover o mouse para o menu)
    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Botão que abre/fecha o dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-2 font-medium text-white hover:text-white/90 transition-colors duration-200"
            >
                {label}
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Lista de itens do dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[250px] z-50">
                    <ul className="py-2">
                        {items.map((item, index) => (
                            <li key={index}>
                                {/* Cabeçalho de categoria */}
                                {item.isHeader ? (
                                    <h6 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                                        {item.label}
                                    </h6>
                                ) : (
                                    /* Link clicável */
                                    <a 
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-button transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};