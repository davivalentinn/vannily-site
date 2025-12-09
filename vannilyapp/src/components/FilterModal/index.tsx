import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { listarTodosProdutos } from "../../services/produto-service";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  initialFilters?: any;
}

export function FilterModal({ open, onClose, onApply, initialFilters }: FilterModalProps) {
  const [tipoProduto, setTipoProduto] = useState("todos");

  // Controle de seções expandidas
  const [expandedSections, setExpandedSections] = useState({
    tipo: true,
    preco: true,
    jogo: true,
    roupa: true
  });

  // listas carregadas automaticamente
  const [temasJogo, setTemasJogo] = useState<string[]>([]);
  const [generosJogo, setGenerosJogo] = useState<string[]>([]);
  const [tiposJogo, setTiposJogo] = useState<string[]>([]);
  const [complexidades, setComplexidades] = useState<string[]>([]);
  const [tamanhosRoupa, setTamanhosRoupa] = useState<string[]>([]);
  const [coresRoupa, setCoresRoupa] = useState<string[]>([]);

  // valores selecionados
  const [temaJogo, setTemaJogo] = useState("");
  const [generoJogo, setGeneroJogo] = useState("");
  const [tipoJogo, setTipoJogo] = useState("");
  const [complexidade, setComplexidade] = useState("");
  const [tamanhoRoupa, setTamanhoRoupa] = useState("");
  const [corRoupa, setCorRoupa] = useState("");
  const [preco, setPreco] = useState(1550);

  // Alternar seção expandida
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Carregar filtros iniciais quando o modal abrir
  useEffect(() => {
    if (open && initialFilters) {
      if (initialFilters.tipoProduto) setTipoProduto(initialFilters.tipoProduto);
      if (initialFilters.temaJogo) setTemaJogo(initialFilters.temaJogo);
      if (initialFilters.generoJogo) setGeneroJogo(initialFilters.generoJogo);
      if (initialFilters.tipoJogo) setTipoJogo(initialFilters.tipoJogo);
      if (initialFilters.complexidade) setComplexidade(initialFilters.complexidade);
      if (initialFilters.tamanhoRoupa) setTamanhoRoupa(initialFilters.tamanhoRoupa);
      if (initialFilters.corRoupa) setCorRoupa(initialFilters.corRoupa);
      if (typeof initialFilters.precoMax === "number") setPreco(initialFilters.precoMax);
    }
  }, [open, initialFilters]);

  // carregamento inicial
  useEffect(() => {
    if (!open) return;

    async function loadOptions() {
      const produtos = await listarTodosProdutos();

      const temasJ = new Set<string>();
      const generosJ = new Set<string>();
      const tiposJ = new Set<string>();
      const compJ = new Set<string>();
      const tamanhos = new Set<string>();
      const cores = new Set<string>();

      produtos.forEach((p: any) => {
        if (p.jogo) {
          if (p.jogo.tema) temasJ.add(p.jogo.tema);
          if (p.jogo.genero) generosJ.add(p.jogo.genero);
          if (p.jogo.tipoJogo) tiposJ.add(p.jogo.tipoJogo);
          if (p.jogo.complexidade) compJ.add(p.jogo.complexidade);
        }

        if (p.roupa) {
          if (p.roupa.tamanho) tamanhos.add(p.roupa.tamanho);
          if (p.roupa.cor) cores.add(p.roupa.cor);
        }
      });

      setTemasJogo(Array.from(temasJ));
      setGenerosJogo(Array.from(generosJ));
      setTiposJogo(Array.from(tiposJ));
      setComplexidades(Array.from(compJ));
      setTamanhosRoupa(Array.from(tamanhos));
      setCoresRoupa(Array.from(cores));
    }

    loadOptions();
  }, [open]);

  // ao trocar tipoProduto, limpa os campos não relacionados
  useEffect(() => {
    if (tipoProduto === "jogo") {
      setTamanhoRoupa("");
      setCorRoupa("");
    }

    if (tipoProduto === "roupa") {
      setTemaJogo("");
      setGeneroJogo("");
      setTipoJogo("");
      setComplexidade("");
    }

    if (tipoProduto === "todos") {
      setTemaJogo("");
      setGeneroJogo("");
      setTipoJogo("");
      setComplexidade("");
      setTamanhoRoupa("");
      setCorRoupa("");
    }
  }, [tipoProduto]);

  if (!open) return null;

  function applyFilters() {
    const filters: any = { precoMax: preco };

    if (tipoProduto !== "todos") filters.tipoProduto = tipoProduto;

    if (tipoProduto === "jogo") {
      if (temaJogo) filters.temaJogo = temaJogo;
      if (generoJogo) filters.generoJogo = generoJogo;
      if (tipoJogo) filters.tipoJogo = tipoJogo;
      if (complexidade) filters.complexidade = complexidade;
    }

    if (tipoProduto === "roupa") {
      if (tamanhoRoupa) filters.tamanhoRoupa = tamanhoRoupa;
      if (corRoupa) filters.corRoupa = corRoupa;
    }

    onApply(filters);
    onClose();
  }

  function resetFilters() {
    setTipoProduto("todos");
    setTemaJogo("");
    setGeneroJogo("");
    setTipoJogo("");
    setComplexidade("");
    setTamanhoRoupa("");
    setCorRoupa("");
    setPreco(1550);
  }

  // Contador de filtros ativos
  const activeFiltersCount = [
    tipoProduto !== "todos",
    temaJogo,
    generoJogo,
    tipoJogo,
    complexidade,
    tamanhoRoupa,
    corRoupa
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-fadeIn">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl overflow-y-auto animate-slideIn">
        
        {/* Header fixo */}
        <div className="sticky top-0 bg-white border-b z-10 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-[#8B1689] font-medium mt-1">
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}
                </p>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-4 space-y-1">

          {/* Seção: Tipo de Produto */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('tipo')}
              className="w-full flex justify-between items-center py-3 text-left group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8B1689] transition-colors">
                Tipo de Produto
              </h3>
              {expandedSections.tipo ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.tipo && (
              <div className="space-y-2 mt-2 animate-slideDown">
                {['todos', 'jogo', 'roupa'].map(tipo => (
                  <label key={tipo} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="tipoProduto"
                      value={tipo}
                      checked={tipoProduto === tipo}
                      onChange={(e) => setTipoProduto(e.target.value)}
                      className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#8B1689] transition-colors capitalize">
                      {tipo === 'todos' ? 'Todos os Produtos' : tipo === 'jogo' ? 'Jogos' : 'Roupas'}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Seção: Preço */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('preco')}
              className="w-full flex justify-between items-center py-3 text-left group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8B1689] transition-colors">
                Faixa de Preço
              </h3>
              {expandedSections.preco ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.preco && (
              <div className="mt-3 animate-slideDown">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Até</span>
                  <span className="text-xl font-bold text-[#8B1689]">
                    R$ {preco.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <input
                  type="range"
                  min={0}
                  max={1550}
                  step={10}
                  value={preco}
                  onChange={(e) => setPreco(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>R$ 0</span>
                  <span>R$ 1.550</span>
                </div>
              </div>
            )}
          </div>

          {/* Seção: Filtros de Jogos */}
          {tipoProduto === "jogo" && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection('jogo')}
                className="w-full flex justify-between items-center py-3 text-left group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8B1689] transition-colors">
                  Características do Jogo
                </h3>
                {expandedSections.jogo ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSections.jogo && (
                <div className="space-y-4 mt-3 animate-slideDown">
                  {/* Tema */}
                  {temasJogo.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Tema</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="tema"
                            value=""
                            checked={temaJogo === ""}
                            onChange={() => setTemaJogo("")}
                            className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">Todos</span>
                        </label>
                        {temasJogo.map(t => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="tema"
                              value={t}
                              checked={temaJogo === t}
                              onChange={() => setTemaJogo(t)}
                              className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gênero */}
                  {generosJogo.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Gênero</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="genero"
                            value=""
                            checked={generoJogo === ""}
                            onChange={() => setGeneroJogo("")}
                            className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">Todos</span>
                        </label>
                        {generosJogo.map(g => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="genero"
                              value={g}
                              checked={generoJogo === g}
                              onChange={() => setGeneroJogo(g)}
                              className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tipo de Jogo */}
                  {tiposJogo.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="tipoJogo"
                            value=""
                            checked={tipoJogo === ""}
                            onChange={() => setTipoJogo("")}
                            className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">Todos</span>
                        </label>
                        {tiposJogo.map(t => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="tipoJogo"
                              value={t}
                              checked={tipoJogo === t}
                              onChange={() => setTipoJogo(t)}
                              className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complexidade */}
                  {complexidades.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Complexidade</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="complexidade"
                            value=""
                            checked={complexidade === ""}
                            onChange={() => setComplexidade("")}
                            className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">Todas</span>
                        </label>
                        {complexidades.map(c => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="complexidade"
                              value={c}
                              checked={complexidade === c}
                              onChange={() => setComplexidade(c)}
                              className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Seção: Filtros de Roupas */}
          {tipoProduto === "roupa" && (
            <div className="border-b pb-4">
              <button
                onClick={() => toggleSection('roupa')}
                className="w-full flex justify-between items-center py-3 text-left group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8B1689] transition-colors">
                  Características da Roupa
                </h3>
                {expandedSections.roupa ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSections.roupa && (
                <div className="space-y-4 mt-3 animate-slideDown">
                  {/* Tamanho */}
                  {tamanhosRoupa.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Tamanho</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setTamanhoRoupa("")}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            tamanhoRoupa === ""
                              ? "border-[#8B1689] bg-[#8B1689] text-white"
                              : "border-gray-300 text-gray-700 hover:border-[#8B1689]"
                          }`}
                        >
                          Todos
                        </button>
                        {tamanhosRoupa.map(t => (
                          <button
                            key={t}
                            onClick={() => setTamanhoRoupa(t)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                              tamanhoRoupa === t
                                ? "border-[#8B1689] bg-[#8B1689] text-white"
                                : "border-gray-300 text-gray-700 hover:border-[#8B1689]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cor */}
                  {coresRoupa.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Cor</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="cor"
                            value=""
                            checked={corRoupa === ""}
                            onChange={() => setCorRoupa("")}
                            className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">Todas</span>
                        </label>
                        {coresRoupa.map(c => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="cor"
                              value={c}
                              checked={corRoupa === c}
                              onChange={() => setCorRoupa(c)}
                              className="w-4 h-4 text-[#8B1689] focus:ring-[#8B1689]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-[#8B1689]">{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer fixo com botões */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 space-y-3">
          <button
            onClick={applyFilters}
            className="w-full bg-[#8B1689] text-white py-3 rounded-lg font-semibold hover:bg-[#701070] transition-all shadow-lg hover:shadow-xl"
          >
            Aplicar Filtros
          </button>
          
          <button
            onClick={resetFilters}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-[#8B1689] hover:text-[#8B1689] transition-all"
          >
            Limpar Tudo
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        /* Estilo do slider */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #8B1689;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-webkit-slider-thumb:hover {
          background: #701070;
          box-shadow: 0 2px 8px rgba(139, 22, 137, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8B1689;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb:hover {
          background: #701070;
          box-shadow: 0 2px 8px rgba(139, 22, 137, 0.4);
        }
      `}</style>
    </div>
  );
}