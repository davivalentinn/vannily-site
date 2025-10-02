import { RegisterForm } from "./RegisterForm"

export function RegisterPage() {
    return (
        <section className="w-full max-w-7xl">
            <div>
                <h1>Criar Conta</h1>
                <span>*Campos Obrigatórios</span>
            </div>
            <RegisterForm/>

        </section>
    )
}