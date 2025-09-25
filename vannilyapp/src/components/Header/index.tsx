
import { Link } from "react-router-dom";

export function Header(){
    return(
        <header>
            <nav>
                <Link className="" to="/">
                    www.vannily.com.br
                </Link>

                <Link className="" to="/cart"><i className="ri-shopping-cart-line"></i></Link>
            </nav>
        </header>
    )
}