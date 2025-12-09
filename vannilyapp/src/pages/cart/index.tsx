import { useCart } from "../../context/CartContext";
import { useState } from "react";

export function Cart() {
    const { carrinho, loading, removeItem, clearCart, updateQuantity } = useCart();
    const [cep, setCep] = useState("");
    const [selectedShipping, setSelectedShipping] = useState<"pac" | "sedex">("pac");

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-lg text-gray-600">Carregando carrinho...</p>
            </div>
        );
    }

    if (!carrinho || carrinho.itens.length === 0) {
        return (
            <main className="w-full max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">MEU CARRINHO</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-600 text-lg">Seu carrinho está vazio.</p>
                </div>
            </main>
        );
    }

    const subtotal = carrinho.total;
    const shippingCost = selectedShipping === "sedex" ? 60.49 : 27.49;
    const total = subtotal + shippingCost;

    const handleCalculateShipping = () => {
        if (cep.length >= 8) {
            alert(`Frete calculado para CEP: ${cep}`);
        } else {
            alert("Por favor, insira um CEP válido");
        }
    };

    const handleClearCart = async () => {
        if (confirm("Tem certeza que deseja limpar o carrinho?")) {
            try {
                await clearCart();
            } catch (error) {
                console.error("Erro ao limpar carrinho:", error);
                alert("Erro ao limpar o carrinho. Tente novamente.");
            }
        }
    };

    const handleIncreaseQuantity = async (produtoId: number, quantidadeAtual: number) => {
        try {
            await updateQuantity(produtoId, quantidadeAtual + 1);
        } catch (error) {
            console.error("Erro ao aumentar quantidade:", error);
            alert("Erro ao atualizar quantidade");
        }
    };

    const handleDecreaseQuantity = async (produtoId: number, quantidadeAtual: number) => {
        if (quantidadeAtual > 1) {
            try {
                await updateQuantity(produtoId, quantidadeAtual - 1);
            } catch (error) {
                console.error("Erro ao diminuir quantidade:", error);
                alert("Erro ao atualizar quantidade");
            }
        }
    };

    const handleCheckout = () => {
        alert("Finalizando pedido...");
    };

    return (
        <main className="w-full max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-background">MEU CARRINHO</h1>
                <button 
                    onClick={handleClearCart}
                    className="mt-4 px-6 py-2 border-2 border-background text-background rounded hover:bg-pink-50 transition"
                >
                    LIMPAR
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de Itens */}
                <div className="lg:col-span-2 space-y-4">
                    {carrinho.itens.map((item) => (
                        <div
                            key={item.produtoId}
                            className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                        >
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-purple-600 mt-2"
                                defaultChecked
                            />
                            
                            <img
                                src={item.imagem || "/placeholder.png"}
                                alt={item.nome}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <div className="mb-2">
                                    <h3 className="font-semibold text-sm uppercase text-gray-900 line-clamp-2">
                                        {item.nome}
                                    </h3>
                                    <span className="inline-block mt-1 px-2 py-1 bg-green-500 text-white text-xs rounded">
                                        EM ESTOQUE
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center border rounded">
                                        <button 
                                            onClick={() => handleDecreaseQuantity(item.produtoId, item.quantidade)}
                                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={item.quantidade <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-x">{item.quantidade}</span>
                                        <button 
                                            onClick={() => handleIncreaseQuantity(item.produtoId, item.quantidade)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={() => removeItem(item.produtoId)}
                                        className="text-purple-600 hover:text-purple-800"
                                    >
                                        <i className="ri-delete-bin-line text-xl"></i>
                                    </button>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm text-gray-500">
                                        Tamanho: <span className="font-medium">G</span> Cor: <span className="font-medium">Estampado</span>
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <p className="text-gray-400 line-through text-sm">
                                        R$ {(item.preco * 1.2).toFixed(2)}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        R$ {item.preco.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Painel de Finalização */}
                <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg shadow-sm p-6 sticky top-6">
                        <h2 className="text-xl font-bold text-background mb-4 flex items-center gap-2">
                            <i className="ri-truck-line"></i>
                            FINALIZAR COMPRA
                        </h2>

                        {/* Calcular Frete */}
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="ri-map-pin-line"></i>
                                Calcular o valor do frete
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Seu CEP"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded outline-none"
                                    maxLength={9}
                                />
                                <button
                                    onClick={handleCalculateShipping}
                                    className="px-4 py-2 bg-background text-white rounded transition"
                                >
                                    Calcular
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Entregas para o CEP: 69914742
                            </p>
                        </div>

                        {/* Opções de Envio */}
                        <div className="mb-4 space-y-2">
                            <h3 className="font-semibold mb-2">Envio a domicílio</h3>
                            
                            <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="pac"
                                        checked={selectedShipping === "pac"}
                                        onChange={() => setSelectedShipping("pac")}
                                        className="text-purple-600"
                                    />
                                    <div>
                                        <p className="font-medium">PAC</p>
                                        <p className="text-xs text-gray-500">Chega quinta 18/05</p>
                                    </div>
                                </div>
                                <p className="font-bold">R$ 27,49</p>
                            </label>

                            <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="sedex"
                                        checked={selectedShipping === "sedex"}
                                        onChange={() => setSelectedShipping("sedex")}
                                        className="text-background"
                                    />
                                    <div>
                                        <p className="font-medium">SEDEX</p>
                                        <p className="text-xs text-gray-500">Chega quinta 08/05</p>
                                    </div>
                                </div>
                                <p className="font-bold">R$ 60,49</p>
                            </label>
                        </div>

                        {/* Resumo */}
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Sub-total:</span>
                                <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete:</span>
                                <span className="font-semibold">R$ {shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span>Total a pagar:</span>
                                <span className="text-background">R$ {total.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                à vista ou em até 3x de R$ {(total / 3).toFixed(2)} sem juros
                            </p>
                        </div>

                        {/* Botão de Checkout */}
                        <button
                            onClick={handleCheckout}
                            className="w-full font-montserrat mt-4 py-3 bg-background text-white font-bold rounded-lg "
                        >
                            Fechar pedido
                        </button>

                        {/* Segunda calculadora de frete */}
                        <div className="mt-6 pt-6 border-t">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <i className="ri-map-pin-line"></i>
                                Calcular o valor do frete
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Seu CEP"
                                    className="flex-1 px-3 py-2 border rounded outline-none"
                                />
                                <button className="px-4 py-2 bg-background text-white rounded  transition">
                                    Calcular
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}