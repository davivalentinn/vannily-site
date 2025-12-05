import React from "react";
import { Button } from "../../ui";

interface ModaGeekCardProps {
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
}

export const ModaGeekCard: React.FC<ModaGeekCardProps> = ({
    title,
    subtitle,
    buttonText,
    image,
}) => {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl group">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-white transition-all duration-300 group-hover:from-black/80 group-hover:via-black/30">

                <p className="text-sm font-semibold transform transition-all duration-300 group-hover:translate-y-[-4px]">{subtitle}</p>

                <h2 className="text-2xl font-bold mb-3 transform transition-all duration-300 group-hover:translate-y-[-4px] group-hover:text-title">{title}</h2>


                <Button
                    variant="pill"
                    size="sm"
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
