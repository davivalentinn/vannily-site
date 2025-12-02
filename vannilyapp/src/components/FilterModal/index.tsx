import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { listarTodosProdutos } from "../../services/produto-service";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FilterModal({ open, onClose, onApply }: FilterModalProps) {
  const [tipoProduto, setTipoProduto] = useState("todos");

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

  // carregamento inicial (carrega opções apenas quando abre)
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
        // campos de jogo (extraídos somente de produto.jogo)
        if (p.jogo) {
          if (p.jogo.tema) temasJ.add(p.jogo.tema);
          if (p.jogo.genero) generosJ.add(p.jogo.genero);
          if (p.jogo.tipoJogo) tiposJ.add(p.jogo.tipoJogo);
          if (p.jogo.complexidade) compJ.add(p.jogo.complexidade);
        }

        // campos de roupa (extraídos somente de produto.roupa)
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
    // quando trocar para jogo, limpar campos de roupa
    if (tipoProduto === "jogo") {
      setTamanhoRoupa("");
      setCorRoupa("");
    }

    // quando trocar para roupa, limpar campos de jogo
    if (tipoProduto === "roupa") {
      setTemaJogo("");
      setGeneroJogo("");
      setTipoJogo("");
      setComplexidade("");
    }

    // se voltar para "todos" limpa tudo específico
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

    // tipo
    if (tipoProduto !== "todos") filters.tipoProduto = tipoProduto;

    // jogo (apenas se tiver valor)
    if (tipoProduto === "jogo") {
      if (temaJogo) filters.temaJogo = temaJogo;
      if (generoJogo) filters.generoJogo = generoJogo;
      if (tipoJogo) filters.tipoJogo = tipoJogo;
      if (complexidade) filters.complexidade = complexidade;
    }

    // roupa
    if (tipoProduto === "roupa") {
      if (tamanhoRoupa) filters.tamanhoRoupa = tamanhoRoupa;
      if (corRoupa) filters.corRoupa = corRoupa;
    }

    onApply(filters);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="w-80 bg-white h-full p-5 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filtrar produtos</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="font-medium">Tipo de Produto</label>
          <select
            value={tipoProduto}
            onChange={(e) => setTipoProduto(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="todos">Todos</option>
            <option value="jogo">Jogos</option>
            <option value="roupa">Roupas</option>
          </select>
        </div>

        {/* Preço */}
        <div className="mb-6">
          <label className="font-medium">Preço Máximo</label>
          <p className="text-sm text-gray-600 mt-1">
            Até <strong>R$ {preco},00</strong>
          </p>
          <input
            type="range"
            min={0}
            max={1550}
            step={10}
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            className="w-full mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>R$ 0</span>
            <span>R$ 1550</span>
          </div>
        </div>

        {/* Campos de Jogo */}
        {tipoProduto === "jogo" && (
          <div className="space-y-4">
            <div>
              <label className="font-medium">Tema</label>
              <select
                value={temaJogo}
                onChange={(e) => setTemaJogo(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todos</option>
                {temasJogo.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="font-medium">Gênero</label>
              <select
                value={generoJogo}
                onChange={(e) => setGeneroJogo(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todos</option>
                {generosJogo.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="font-medium">Tipo de Jogo</label>
              <select
                value={tipoJogo}
                onChange={(e) => setTipoJogo(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todos</option>
                {tiposJogo.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="font-medium">Complexidade</label>
              <select
                value={complexidade}
                onChange={(e) => setComplexidade(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todas</option>
                {complexidades.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Campos de Roupa */}
        {tipoProduto === "roupa" && (
          <div className="space-y-4">
            <div>
              <label className="font-medium">Tamanho</label>
              <select
                value={tamanhoRoupa}
                onChange={(e) => setTamanhoRoupa(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todos</option>
                {tamanhosRoupa.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="font-medium">Cor</label>
              <select
                value={corRoupa}
                onChange={(e) => setCorRoupa(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Todas</option>
                {coresRoupa.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        <button
          onClick={applyFilters}
          className="w-full bg-[#8B1689] text-white py-2 rounded mt-6 hover:bg-[#701070]"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
