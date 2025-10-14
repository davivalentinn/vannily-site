import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search";
import { ButtonRegisterOrLogin } from "../ButtonRegisterOrLogin";
import { SubMenu, MobileSubMenu } from '../SubMenuDropdown';

export function Header() {
    return (
        <header className="w-full px-1 bg-primary">
            <nav className="w-full max-w-7xl h-22 items-center flex justify-between px-1 mx-auto gap-4
            
            ">
                <div className="py-2">
                    <Link to="/">
                        <img className="h-20 " src="/logo.svg" alt="" />
                    </Link>
                </div>


                <Search />

                <div className="flex items-center gap-2">
                <Link className="bg-button p-2 px-3 rounded-lg" to="/favorites">
                        <i className="ri-heart-add-2-line"></i>
                    </Link>
                    <Link className="bg-button px-3 py-2 rounded-lg" to="/cart">
                        <i className="ri-shopping-cart-line"></i>
                    </Link>
                    
                    <ButtonRegisterOrLogin />
                </div>

            </nav>


            {/* SubMenu Desktop */}
            <SubMenu />

            {/* SubMenu Mobile */}
            <MobileSubMenu />

        </header>
    )
}