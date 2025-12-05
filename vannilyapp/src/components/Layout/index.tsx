
//Renderizar as páginas
import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import { Footer } from "../sections/Footer/Footer";
import NewsLetterSection from "../sections/NewsLetter";

export function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <NewsLetterSection/>
            <Footer/>
        </>
    )
}