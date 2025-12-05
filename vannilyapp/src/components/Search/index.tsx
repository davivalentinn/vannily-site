import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { searchProduto, listarTodosProdutos } from "../../services/produto-service";
import type { ProdutoSearchResult } from "../../services/produto-service";
import { useNavigate } from "react-router-dom";
import { FilterModal } from "../FilterModal/index.tsx";

export function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<ProdutoSearchResult[]>([]);
  const [filtered, setFiltered] = useState<ProdutoSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const [openFilters, setOpenFilters] = useState(false);
  const [lastFilters, setLastFilters] = useState<any>(null);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown clicando fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFiltered([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce da busca digitada
  useEffect(() => {
    const delay = setTimeout(() => {
      const text = searchValue.trim();

      if (text.length > 1) {
        setLoading(true);

        searchProduto(text)
          .then(data => {
            setResults(data);
            applyFiltersToResults(data, lastFilters);
          })
          .finally(() => setLoading(false));
      } else {
        if (!lastFilters) {
          setResults([]);
          setFiltered([]);
        } else {
          // se existe filtro ativo, carregar todos e aplicar o filtro atual
          loadAllForFilters(lastFilters);
        }
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchValue, lastFilters]); // observe: lastFilters está aqui para reagir a mudanças

  // Carregar todos para aplicar filtro sem search (recebe filtros diretamente)
  async function loadAllForFilters(filters?: any) {
    setLoading(true);
    try {
      const all = await listarTodosProdutos();
      setResults(all);
      applyFiltersToResults(all, filters ?? lastFilters);
    } finally {
      setLoading(false);
    }
  }

  // Lógica de filtragem — somente front
  function applyFiltersToResults(base: ProdutoSearchResult[], filters: any) {
    if (!filters) {
      setFiltered(base);
      return;
    }

    let temp = [...base];

    // tipo: use presença de p.jogo / p.roupa (mais confiável)
    if (filters.tipoProduto === "jogo") {
      temp = temp.filter(p => Boolean((p as any).jogo));
    } else if (filters.tipoProduto === "roupa") {
      temp = temp.filter(p => Boolean((p as any).roupa));
    }

    // jogo: tema
    if (filters.temaJogo) {
      temp = temp.filter(p => (p as any).jogo?.tema?.toLowerCase() === filters.temaJogo.toLowerCase());
    }

    // jogo: gênero
    if (filters.generoJogo) {
      temp = temp.filter(p => (p as any).jogo?.genero?.toLowerCase() === filters.generoJogo.toLowerCase());
    }

    // preço
    if (typeof filters.precoMax === "number") {
      temp = temp.filter(p => (p.preco ?? 0) <= filters.precoMax);
    }

    // jogo: tipo
    if (filters.tipoJogo) {
      temp = temp.filter(p => (p as any).jogo?.tipoJogo?.toLowerCase() === filters.tipoJogo.toLowerCase());
    }

    // jogo: complexidade
    if (filters.complexidade) {
      temp = temp.filter(p => (p as any).jogo?.complexidade?.toLowerCase() === filters.complexidade.toLowerCase());
    }

    // roupa: tamanho
    if (filters.tamanhoRoupa) {
      temp = temp.filter(p => (p as any).roupa?.tamanho?.toLowerCase() === filters.tamanhoRoupa.toLowerCase());
    }

    // roupa: cor
    if (filters.corRoupa) {
      temp = temp.filter(p => (p as any).roupa?.cor?.toLowerCase() === filters.corRoupa.toLowerCase());
    }

    setFiltered(temp);
  }

  // Quando o usuário aplica filtros
  async function handleApplyFilters(filters: any) {
    // guarda filtros atuais (estado)
    setLastFilters(filters);

    // limpa o texto digitado conforme você pediu
    setSearchValue("");

    // carregar todos os produtos e aplicar os filtros passados — NÃO confiar no estado stale
    await loadAllForFilters(filters);

    // abrir dropdown (filtered já foi setado por loadAllForFilters)
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      <form onSubmit={e => e.preventDefault()} className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Pesquisar por"
          className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded bg-white 
                     focus:ring-[#8B1689] outline-none transition-all"
        />

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>

        {searchValue && (
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="absolute inset-y-0 right-10 pr-3 text-gray-400 hover:text-[#8B1689]"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpenFilters(true)}
          className="absolute inset-y-0 right-0 pr-3 text-gray-500 hover:text-[#8B1689]"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </form>

      {/* Dropdown */}
      {(filtered.length > 0 || loading) && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded border z-50 max-h-80 overflow-auto">
          {loading && <p className="p-4 text-gray-500">Carregando...</p>}

          {!loading && filtered.length === 0 && (
            <p className="p-4 text-gray-600">Nenhum produto encontrado.</p>
          )}

          {!loading && filtered.length > 0 && (
            filtered.map(item => (
              <div
                key={(item as any).id}
                className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer transition"
                onClick={() => navigate(`/produto/${(item as any).id}`)}
              >
                <img
                  src={(item as any).imagem}
                  alt={(item as any).nome}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <p className="font-medium">{(item as any).nome}</p>
                  <p className="text-sm text-gray-600">
                    R$ {(item as any).preco?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <FilterModal
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
