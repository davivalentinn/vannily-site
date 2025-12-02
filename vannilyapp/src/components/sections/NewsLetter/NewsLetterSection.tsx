import React from "react";
import bgImage from "public/background.png"
import { section } from "framer-motion/client";

export const NewsLetterSection = () => {
    return (
        <section className="w-full bg-black/95 bg-cover bg-center bg-no-repeat py-16 px-"
        style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >

        </section>
    )
}