import { useState } from "react";

export function Favorites() {
  const [view, setView] = useState<"list" | "grid">("list");

  const products = [
    {
      id: 1,
      title:
        "Blusa Moletom Sublimação com Capuz Anime Demon Slayer Tanjiro - Estampado",
      oldPrice: "R$ 219,99",
      price: "R$ 129,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Moletom-Anime-Geek-Tanjiro-Uniforme.png",
    },
    {
      id: 2,
      title:
        "Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico",
      oldPrice: "R$ 289,99",
      price: "R$ 189,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png",
    },
    {
      id: 3,
      title:
        "Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico",
      oldPrice: "R$ 289,99",
      price: "R$ 189,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png",
    },
    {
      id: 4,
      title:
        "Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico",
      oldPrice: "R$ 289,99",
      price: "R$ 189,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png",
    },
    {
      id: 5,
      title:
        "Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico",
      oldPrice: "R$ 289,99",
      price: "R$ 189,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png",
    },
    {
      id: 6,
      title:
        "Camiseta Gamer Geek Masculina – Estampa Retrô Exclusiva do Mario Bros Clássico",
      oldPrice: "R$ 289,99",
      price: "R$ 189,99",
      size: "G",
      color: "Estampado",
      stock: true,
      img: "assets/images/products/Camiseta-Gamer-Geek-Mario-Bros-Arcade.png",
    },
  ];

  return (
    <main className="w-full bg-white text-[#353535] font-[Montserrat]">
      <section className="max-w-[1300px] mx-auto py-20">
        {/* Título */}
        <div className="mb-4">
          <h1 className="text-[30px] font-extrabold uppercase">Favoritos</h1>
          <div className="w-full h-1 bg-bar"></div>
        </div>

        {/* Caixa Branca */}
        <div className="bg-white border border-gray-300 shadow-md rounded-md">
          {/* Barra Superior */}
          <div className="flex justify-between items-center p-2 border-b border-gray-200 rounded-t-md">
            <div className="flex items-center">
              <div className="w-10 h-10 border-[3px] border-[#353535] rounded-full flex justify-center items-center ml-6">
                <i className="ri-user-3-line text-[30px] text-[#353535] cursor-pointer"></i>
              </div>
              <button className="ml-2 border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition">
                + Convidar
              </button>
            </div>

            <button className="border border-black rounded-md px-3 py-1 font-medium text-[14px] bg-white hover:bg-gray-100 transition mr-6">
              Adicionar produto
            </button>
          </div>

          {/* Barra Inferior */}
          <div className="border-b border-gray-200">
            <div className="w-full h-1 bg-bar"></div>

            <div className="flex justify-between items-center py-2 px-6">
              {/* Ícones */}
              <div className="flex items-center gap-3 text-[24px] px-4">
                <i
                  className={`ri-menu-line text-[24px] cursor-pointer pb-1 ${
                    view === "list"
                      ? "text-[#8B1689] border-b-4 border-[#8B1689]"
                      : "text-[#353535] "
                  }`}
                  onClick={() => setView("list")}
                ></i>

                <i
                  className={`ri-grid-fill text-[24px] cursor-pointer pb-1 ${
                    view === "grid"
                      ? "text-[#8B1689] border-b-4 border-[#8B1689]"
                      : "text-[#353535] "
                  }`}
                  onClick={() => setView("grid")}
                ></i>
              </div>

              {/* Buscar */}
              <div className="flex items-center">
                <i className="ri-search-line text-[#353535] text-[20px] mr-2 cursor-pointer"></i>
                <input
                  type="text"
                  placeholder="Buscar nos Favoritos"
                  className="border border-black w-80 rounded-md px-3 py-1 text-[14px] font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Produtos */}
          <div
            className={
              view === "list"
                ? "flex flex-col"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6"
            }
          >
            {products.map((p) => (
              <div
                key={p.id}
                className={
                  view === "list"
                    ? "flex justify-between border-b border-gray-200 p-3"
                    : "border border-gray-300 rounded-md shadow-sm p-3 flex flex-col items-center"
                }
              >
                {/* LISTA */}
                {view === "list" && (
                  <>
                    <div className="flex">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-[18px] h-[18px] accent-[#8B1689] border-2 border-[#8B1689] rounded-md cursor-pointer self-center ml-1"
                      />

                      <div className="bg-[#D7D7D7] w-[120px] h-[210px] rounded-md flex justify-center items-center ml-3">
                        <img
                          src={p.img}
                          className="w-[100px] h-[110px]"
                        />
                      </div>

                      <div className="flex flex-col ml-4 w-[60%]">
                        <h2 className="uppercase text-[14px] font-extrabold">
                          {p.title}
                        </h2>

                        <div className="bg-green-600 w-[140px] h-[30px] rounded-md mt-1 flex justify-center items-center">
                          <p className="text-white text-[14px] font-bold">
                            EM ESTOQUE
                          </p>
                        </div>

                        <p className="line-through text-[#656565] mt-2 text-[15px]">
                          {p.oldPrice}
                        </p>

                        <p className="text-[20px] font-extrabold">{p.price}</p>

                        <div className="flex items-center border-2 border-[#333] rounded-md h-[35px] w-[120px] mt-2 justify-center gap-3">
                          <button className="font-extrabold">-</button>
                          <span className="font-extrabold p-4">1</span>
                          <button className="font-extrabold">+</button>
                        </div>

                        <div className="flex items-center mt-2 text-[14px]">
                          <p>Tamanho:</p>
                          <p className="font-extrabold mx-2">{p.size}</p>
                          <p>Cor:</p>
                          <p className="font-extrabold mx-2">{p.color}</p>
                        </div>
                      </div>
                    </div>

                    {/* Botões direita */}
                    <div className="flex items-end p-2">
                      <button className="group border-2 border-[#8B1689] text-background font-semibold rounded-md px-4 py-1 text-[14px] hover:bg-[#8B1689] hover:text-white transition">
                        <i className="ri-shopping-cart-2-line mr-1 text-background group-hover:text-white transition"></i>{" "}
                        Adicionar ao carrinho
                      </button>

                      <label className="cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <i className="ri-heart-fill text-[24px] text-[#8B1689] peer-checked:text-gray-400 transition-colors ml-3"></i>
                      </label>
                    </div>
                  </>
                )}

                {/* GRID */}
                {view === "grid" && (
                  <>
                    <div className="bg-[#D7D7D7] w-full h-[180px] rounded-md flex justify-center items-center">
                      <img
                        src={p.img}
                        className="w-[130px] h-[130px]"
                      />
                    </div>

                    <p className="text-center font-extrabold text-[18px] mt-2">
                      {p.price}
                    </p>

                    <div className="flex items-center justify-center w-full mt-1">
                      <button className="border-2 border-[#8B1689] text-[#8B1689] rounded-md px-4 py-1 text-[14px] hover:bg-[#8B1689] hover:text-white transition">
                        <i className="ri-shopping-cart-2-line mr-1"></i>{" "}
                        Adicionar ao carrinho
                      </button>

                      <i className="ri-heart-fill text-[24px] text-[#8B1689] ml-3 cursor-pointer"></i>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
