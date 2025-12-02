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
        <div className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t bg-black/55 from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                <p className="text-sm font-semibold">{subtitle}</p>

                <h2 className="text-2xl text-bar font-bold mb-3">{title}</h2>


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
