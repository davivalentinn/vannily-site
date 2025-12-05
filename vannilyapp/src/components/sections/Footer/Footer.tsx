import { Link } from 'react-router-dom'
import bgImage from './assets/background.png'
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer
            className="w-full bg-black bg-cover bg-center bg-no-repeat py-16 px-4"
            // style={{
            //     backgroundImage: `url(${bgImage})`,
            // }}
        >
            
            <div className="max-w-7xl mx-auto">
                {/* Grid com 4 colunas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Coluna 1 - Conheça-nos */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-white mb-2 relative inline-block">
                            Conheça-nos
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-bar"></span>
                        </h2>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Sobre nós
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Características
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Notícias & Blog
                        </a>
                    </div>

                    {/* Coluna 2 - Empresa */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-white mb-2 relative inline-block">
                            Empresa
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-bar"></span>
                        </h2>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            FAQs
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            História
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Depoimentos
                        </a>
                    </div>

                    {/* Coluna 3 - Contato */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-white mb-2 relative inline-block">
                            Contato
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-bar"></span>
                        </h2>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Central de atendimento
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Central de apoio
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Contate-nos
                        </a>
                    </div>

                    {/* Coluna 4 - Suporte */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-white mb-2 relative inline-block">
                            Suporte
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-bar"></span>
                        </h2>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Política de privacidade
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Termos & Serviços
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                            Devoluções e pedidos
                        </a>
                    </div>
                </div>

                {/* Divisória elegante */}
                <div className="border-t border-bar pt-8">
                    {/* Copyright e Redes Sociais - justify-between */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <p className="text-gray-200 text-sm text-center md:text-left">
                            © Copyright Vannily. Todos os direitos reservados.
                        </p>

                        {/* Ícones de Redes Sociais */}
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="text-gray-200 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-200 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-200 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-200 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Youtube"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    )
}