import { useState, useEffect } from "react";
import { Carousel } from "../../components/sections/Carousel";
import ProductCarousel from "../../components/sections/ProductCarousel/ProductCarousel";
import ProductSlider from "../../components/sections/ProductSlider/ProductSlider";
import {
    listarPromocoes,
    listarProdutosPorNomeCategoria,
    buscarProdutosPorMaterialForro,
    listarProdutosRecentes,
    buscarProdutoPorId,
    type ProdutoCompleto,
    listarTodosProdutos
} from "../../services/produto-service";
import { ModaGeekSection } from "../../components/sections/ModaGeek";

export function Home() {
    const [produtosCarousel, setProdutosCarousel] = useState<ProdutoCompleto[]>([]);
    const [loadingCarousel, setLoadingCarousel] = useState(true);

    useEffect(() => {
        async function carregarProdutosCarousel() {
            try {
                // Busca as promoções para exibir no carousel
                const promocoes = await listarPromocoes();

                // Pega apenas os 3 primeiros produtos
                const produtosLimitados = promocoes.slice(0, 3);

                // Busca os dados completos de cada produto
                const completos: ProdutoCompleto[] = [];
                for (const prod of produtosLimitados) {
                    const completo = await buscarProdutoPorId(prod.id);
                    completos.push(completo);
                }

                setProdutosCarousel(completos);
            } catch (error) {
                console.error("Erro ao carregar produtos do carousel:", error);
            } finally {
                setLoadingCarousel(false);
            }
        }

        carregarProdutosCarousel();
    }, []);

    return (
        <>
            <Carousel />

            {!loadingCarousel && produtosCarousel.length > 0 && (
                <ProductCarousel produtos={produtosCarousel} />
            )}


            <ProductSlider
                title="Promoções Imperdíveis"
                fetchFunction={listarPromocoes}
            />


            <ProductSlider
                title="Roupas em Destaque"
                fetchFunction={() => listarProdutosPorNomeCategoria("Roupas")}
            />


            <ProductSlider
                title="Jogos de Tabuleiro"
                fetchFunction={() => listarProdutosPorNomeCategoria("Jogos de Tabuleiro")}
            />

            <ProductSlider
                title="Catalógo Completo"
                fetchFunction={listarTodosProdutos}
                itemsPerView={8}
            />

            <ModaGeekSection />

            <ProductSlider
                title="Material de Algodão"
                fetchFunction={() => buscarProdutosPorMaterialForro("Algodão")}
            />

            <ProductSlider
                title="Jogos de Cartas"
                fetchFunction={() => listarProdutosPorNomeCategoria("Jogos de Cartas")}
            />


        </>
    );
}