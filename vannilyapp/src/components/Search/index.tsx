import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export function Search() {
    //Estado controlado com (useState) para o valor do input
    const [searchValue, setSearchValue] = useState<string>('');

    //Função (handleSubmit) que previne o comportamento padrão e processa a pesquisa
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue.trim()) {
            console.log('Pesquisando por:', searchValue);
            
        }
    };

    //Função (handleInputChange) para atualizar o estado conforme o usuário digita
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    //Função (handleClear) limpa o valor do input quando o botão X é clicado
    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div className="min-w-[800px]">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Pesquisar por"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded  focus:ring-[#8B1689] focus:border-transparent outline-none transition-all duration-200 bg-white"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {searchValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-button  duration-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
                {!searchValue && (
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-button duration-200"
                    >
                        <SearchIcon className="h-5 w-5" />
                    </button>
                )}
            </form>
        </div>
    );
}