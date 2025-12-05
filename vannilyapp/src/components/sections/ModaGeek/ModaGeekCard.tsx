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
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl transition-all duration-300 hover:shadow-2xl group">
            <img
                src={image}
                alt={title}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 sm:p-5 md:p-6 flex flex-col justify-end text-white transition-all duration-300 group-hover:from-black/80 group-hover:via-black/30">

                <p className="text-xs sm:text-sm font-semibold transform transition-all duration-300 group-hover:translate-y-[-4px] mb-1">
                    {subtitle}
                </p>

                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transform transition-all duration-300 group-hover:translate-y-[-4px] group-hover:text-title line-clamp-2">
                    {title}
                </h2>

                <Button
                    variant="pill"
                    size="sm"
                    className="text-xs sm:text-sm w-full sm:w-auto"
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
