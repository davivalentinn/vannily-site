import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "./assets/background.png"
import { section } from "framer-motion/client";

export const NewsLetterSection = () => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const nameValue = name.trim();
        const emailValue = email.trim();

        if (!nameValue || !emailValue) {
            setError("Por favor, preencha todas as informações.");
            setTimeout(() => setError(""), 5000); // Remove erro após 5 segundos
            return;
        }

        // Se estiver tudo certo
        setError("");
        alert("Enviado com sucesso!");
        setName("");
        setEmail("");
    }
    return (
        <section className="w-full bg-black/95 bg-cover bg-center bg-no-repeat py-16 px-4"
            // style={{
            //     backgroundImage: `url(${bgImage})`,
            // }}
        >
            <div className="flex justify-center items-center">
                <div className="flex items-center justify-center p-2 py-4">
                    <Link to="/">
                        <img className="h-40" src="/logo.svg" alt="Logo" />
                    </Link>
                </div>

                <form className="p-5">
                    <div className="flex flex-col">
                        <h2 className="text-title text-2xl shadow-md">Não fique de fora!</h2>
                        <p className="text-white text-xl mb-4 uppercase font-bold">Receba notificações de nossas promoções, lançamentos e eventos!</p>
                    </div>

                    <div className="flex gap-2">
                        <input type="text" placeholder="Informe seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none p-2 px-4 rounded-md font-montserrat"
                        />
                        <input type="email" placeholder="Informe seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="outline-none p-2 px-4 rounded-md font-montserrat"
                        />
                        <button type="submit" onClick={handleSubmit} className="bg-title text-white p-2 px-4 rounded-md font-montserrat font-bold hover:bg-title/90 hover:shadow-lg">Enviar agora</button>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg animate-[slideIn_0.3s_ease-out]">
                            <svg
                                className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="flex-1">
                                <p className="text-red-700 font-semibold">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    )
}


export default NewsLetterSection;