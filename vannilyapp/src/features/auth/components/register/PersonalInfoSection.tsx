
export function PersonalInfoSection() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="">
                <h2 className="">Informações Pessoais</h2>
            </div>

            <div className="relative my-[5px] mx-5">
                <input
                className="px-5 py-2 text-[#1f1f1f] appearance-none border-2 border-black/50 rounded-sm w-full shadow-md focus:outline-none"
                type="text" name="name" required />
                <label 
                className="absolute left-4 top-1/2 -translate-y-1/2 px-1 text-[16px] font-poppins font-normal text-[var(--title-color)] transition-all peer-focus:top-0 peer-focus:bg-white peer-focus:text-sm peer-valid:top-0 peer-valid:bg-white peer-valid:text-sm"
                htmlFor="name">*Nome Completo</label>
            </div>
            <div>
                <input type="number" name="phone" required />
                <label htmlFor="phone">*DDD e número de celular</label>
            </div>
            <div>
                <div>
                    <input type="checkbox" checked />
                </div>
                <div>
                    <p>
                        Quero receber <b>ofertas</b> e <b>novidades</b> da loja Vannily
                        por <b>e-mail</b>
                    </p>
                </div>
            </div>

            <div>
                <div>
                    <input type="checkbox" checked />
                </div>

                <p>
                    Concordo com o uso dos meus dados para compra e experiência no site conforme a <b> política de privacidade </b>
                </p>
            </div>

        </section>
    )
}