export function Favorites() {
  return (
    <main className="w-full bg-white text-[#353535] font-[Montserrat]">
      {/* Título */}
      <section className="max-w-[1300px] mx-auto py-20">
        <div className="mb-4">
          <h1 className="text-[30px] font-extrabold uppercase">Favoritos</h1>
          <div className="w-full h-1 bg-background"></div>
        </div>

        {/* Caixa principal */}
        <div className="bg-white border border-gray-300 shadow-md rounded-md">
          {/* Barra superior */}
          <div className="flex justify-between items-center p-2 border-b border-gray-200 rounded-t-md">
            <div className="flex items-center">
              <div className="w-10 h-10 border-[3px] border-[#353535] rounded-full flex justify-center items-center ml-6">
                <i className="ri-user-3-line text-[24px] text-[#353535]"></i>
              </div>
              <button className="ml-2 border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition">
                + Convidar
              </button>
            </div>
            <button className="border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition mr-6">
              Adicionar produto
            </button>
          </div>

          {/* Barra inferior */}
          <div className="border-b border-gray-200">
            <div className="w-full h-2 bg-background"></div>
            <div className="flex justify-between items-center py-2 px-6">
              <div className="flex items-center gap-3 text-[24px] text-[#353535]">
                <i className="ri-grid-fill cursor-pointer"></i>
                <i className="ri-menu-line cursor-pointer"></i>
              </div>
              <div className="flex items-center">
                <i className="ri-search-line text-[#353535] text-[20px] mr-2"></i>
                <input
                  type="text"
                  placeholder="Buscar nos Favoritos"
                  className="border border-black rounded-md px-3 py-1 text-[14px] font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Produtos */}
          <div className="flex flex-col">
            {/* Produto 1 */}
            <div className="flex justify-between border-b border-gray-200 p-3">
              <div className="flex">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-[18px] h-[18px] accent-[#8B1689] border-2 border-[#8B1689] rounded-md mt-2 cursor-pointer"
                />
                <div className="bg-[#D7D7D7] w-[120px] h-[210px] rounded-md flex justify-center items-center ml-3">
                  <img
                    src="assets/images/products/Moletom-Anime-Geek-Tanjiro-Uniforme.png"
                    alt="Produto"
                    className="w-[100px] h-[110px]"
                  />
                </div>

                <div className="flex flex-col ml-4">
                  <h2 className="uppercase text-[15px] font-extrabold w-[90%]">
                    Blusa Moletom Sublimação Full Print com Capuz Anime Demon Slayer Tanjiro - Estampado
                  </h2>
                  <div className="bg-green-600 w-[140px] h-[30px] rounded-md mt-1 flex justify-center items-center">
                    <p className="text-white text-[14px] font-bold">EM ESTOQUE</p>
                  </div>
                  <p className="line-through text-[#656565] mt-2 text-[15px]">R$ 219,99</p>
                  <p className="text-[20px] font-extrabold">R$ 129,99</p>

                  <div className="flex items-center border-2 border-[#333] rounded-md h-[35px] w-[120px] mt-2 justify-center gap-3">
                    <button className="font-extrabold">-</button>
                    <span className="font-extrabold">1</span>
                    <button className="font-extrabold">+</button>
                  </div>

                  <div className="flex items-center mt-2 text-[14px]">
                    <p>Tamanho:</p>
                    <p className="font-extrabold mx-2">G</p>
                    <p>Cor:</p>
                    <p className="font-extrabold mx-2">Estampado</p>
                  </div>
                </div>
              </div>

              {/* Botões à direita */}
              <div className="flex items-center">
                <button className="border-2 border-[#8B1689] text-[#8B1689] font-semibold rounded-md px-4 py-1 text-[14px] hover:bg-[#8B1689] hover:text-white transition">
                  <i className="ri-shopping-cart-2-line mr-1"></i> Adicionar ao carrinho
                </button>
                <i className="ri-heart-fill text-[#8B1689] text-[24px] ml-3 cursor-pointer"></i>
              </div>
            </div>

            {/* Produto 2 */}
            <div className="flex justify-between p-3">
              <div className="flex">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-[18px] h-[18px] accent-[#8B1689] border-2 border-[#8B1689] rounded-md mt-2 cursor-pointer"
                />
                <div className="bg-[#D7D7D7] w-[120px] h-[210px] rounded-md flex justify-center items-center ml-3">
                  <img
                    src="assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png"
                    alt="Produto"
                    className="w-[100px] h-[110px]"
                  />
                </div>

                <div className="flex flex-col ml-4">
                  <h2 className="uppercase text-[15px] font-extrabold w-[90%]">
                    Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico
                  </h2>
                  <div className="bg-green-600 w-[140px] h-[30px] rounded-md mt-1 flex justify-center items-center">
                    <p className="text-white text-[14px] font-bold">EM ESTOQUE</p>
                  </div>
                  <p className="line-through text-[#656565] mt-2 text-[15px]">R$ 289,99</p>
                  <p className="text-[20px] font-extrabold">R$ 189,99</p>

                  <div className="flex items-center border-2 border-[#333] rounded-md h-[35px] w-[120px] mt-2 justify-center gap-3">
                    <button className="font-extrabold">-</button>
                    <span className="font-extrabold">1</span>
                    <button className="font-extrabold">+</button>
                  </div>

                  <div className="flex items-center mt-2 text-[14px]">
                    <p>Tamanho:</p>
                    <p className="font-extrabold mx-2">G</p>
                    <p>Cor:</p>
                    <p className="font-extrabold mx-2">Estampado</p>
                  </div>
                </div>
              </div>

              {/* Botões à direita */}
              <div className="flex items-center">
                <button className="border-2 border-[#8B1689] text-[#8B1689] font-semibold rounded-md px-4 py-1 text-[14px] hover:bg-[#8B1689] hover:text-white transition">
                  <i className="ri-shopping-cart-2-line mr-1"></i> Adicionar ao carrinho
                </button>
                <i className="ri-heart-fill text-[#8B1689] text-[24px] ml-3 cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
