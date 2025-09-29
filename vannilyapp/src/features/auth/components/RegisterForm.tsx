
export function RegisterForm() {
    return (
        <section>
            <div>
                <h1>Criar Conta</h1>
                <span>*Campos Obrigatórios</span>
            </div>

            <div>
                <form action="">
                    <div>
                        <div>
                            <div className="title-campo">
                                <h2>Informaçãoes Pessoais</h2>
                            </div>

                            <div className="box-details">
                                <input type="text" className="input-register" name="nome" required />
                                <label htmlFor="nome">*Nome completo</label>
                            </div>
                            <div className="box-details">
                                <input type="number" className="input-register" name="numero" required />
                                <label htmlFor="numero">*DDD e número de celular</label>
                            </div>

                        </div>


                        <div>
                            <div className="mt-3">
                                <div className="title-campo">
                                    <h2>Sobre sua conta</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}