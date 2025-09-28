import { Link } from "react-router-dom";

export function ButtonSearchCep() {
    return (
        <Link
            className="bg-button flex items-center justify-center 
                    px-4 py-1 rounded text-white"
            to="#">
            <div className="w-10 h-10 flex items-center justify-center rounded-full me-3 bg-button border-2 border-primary">
                <Link to="#">
                    <i className="ri-map-pin-line"></i>
                </Link>
            </div>
            <p className="">Informe seu cep</p>
        </Link>
    )
}