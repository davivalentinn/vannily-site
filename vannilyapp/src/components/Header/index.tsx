
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="w-full px-1 bg-primary">
            <nav className="w-full max-w-7xl h-20 flex items-center justify-between px-5 mx-auto">
                <Link to="/">
                    <img className="h-16 w-auto" src="/public/logo.svg" alt="" />
                </Link>

                <div className="flex items-center  gap-4">
                    <Link className="bg-button p-1 px-2 rounded" to="/cart">
                        <i className="ri-shopping-cart-line text-xl text-white"></i>
                    </Link>
                    <Link className="bg-button p-1 px-2 rounded" to="/favorites">
                        <i className="ri-heart-add-2-line text-xl text-white"></i>
                    </Link>
                </div>


            </nav>
        </header>
    )
}