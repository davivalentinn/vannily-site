import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { searchProduto, type ProdutoSearchResult } from "../../services/produto-service"; 

export function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState<ProdutoSearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setResults([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce da busca
    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchValue.trim().length > 1) {
                setLoading(true);
                searchProduto(searchValue)
                    .then(data => setResults(data))
                    .finally(() => setLoading(false));
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [searchValue]);

    return (
        <div className="min-w-[800px] relative" ref={containerRef}>
            <form onSubmit={e => e.preventDefault()} className="relative">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Pesquisar por"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded bg-white focus:ring-[#8B1689] outline-none transition-all"
                />

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>

                {searchValue && (
                    <button
                        type="button"
                        onClick={() => setSearchValue("")}
                        className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-[#8B1689]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </form>

            {/* Dropdown */}
            {results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded border z-50 max-h-80 overflow-auto">
                    {loading ? (
                        <p className="p-4 text-gray-500">Carregando...</p>
                    ) : (
                        results.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer transition"
                            >
                                <img
                                    src={item.imagem}
                                    alt={item.nome}
                                    className="w-12 h-12 object-cover rounded"
                                />

                                <div>
                                    <p className="font-medium">{item.nome}</p>
                                    <p className="text-sm text-gray-600">
                                        R$ {item.preco.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
