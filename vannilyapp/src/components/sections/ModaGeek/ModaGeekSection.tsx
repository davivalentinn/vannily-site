import React from "react";
import { ModaGeekCard } from "./ModaGeekCard";
import bgImage from "./assets/carousel-bg.png";

export const ModaGeekSection = () => {
    return (
        <section
            className="w-full bg-black/95 bg-cover bg-center bg-no-repeat py-16 px-4"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <h1 className="text-center text-4xl font-extrabold text-white mb-10">
                <span className="text-background">ModaGeek</span> da Vannily
            </h1>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <ModaGeekCard
                    title="Marvel"
                    subtitle="Filmes e séries"
                    buttonText="Conhecer categoria"
                    image="https://papeldeparededigital.com.br/10913-large_default/papel-de-parede-foto-mural-infantil-herois-marvel-.jpg"
                />

                <ModaGeekCard
                    title="One Piece"
                    subtitle="Anime e mangá"
                    buttonText="Conhecer categoria"
                    image="https://dicasgeeks.com.br/wp-content/uploads/2018/05/One_Piece_Anime_Logo.png"
                />

                <ModaGeekCard
                    title="Star Wars"
                    subtitle="Clássicos do cinema"
                    buttonText="Conhecer categoria"
                    image="https://pablogonzalezblasco.com.br/wp-content/uploads/sites/5/2020/03/star-wars-1-capa-1024x692.jpg"
                />

                <ModaGeekCard
                    title="Promoções Imperdíveis"
                    subtitle="Ofertas especiais"
                    buttonText="Conhecer categoria"
                    image="public/carousel/image-5.png"
                />

                <ModaGeekCard
                    title="Harry Potter"
                    subtitle="Magia e fantasia"
                    buttonText="Conhecer categoria"
                    image="https://cienciahoje.org.br/wp-content/uploads/2025/02/harry-potter-pedra-filosofal.jpg"
                />

            </div>
        </section>
    );
};

export default ModaGeekSection;
