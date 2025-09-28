import { Link } from "react-router-dom"

export function ButtonRegisterOrLogin() {
    return (
        <div className="bg-button px-4 py-1 flex items-center justify-between min-w-[180px] rounded-lg">
            <div className="flex items-center justify-center space-x-1">
                <Link to="#" className="hover:text-white/90 transition-colors">
                    Registrar
                </Link>
                <p className="font-roboto font-normal text-white/80">ou</p>
                <Link to="#" className="hover:text-white/90 transition-colors">
                    Entrar
                </Link>
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full ml-3 bg-button border-2 border-primary">
                <Link to="#">
                    <i className="ri-user-line"></i>
                </Link>
            </div>
        </div>

    )
}