export const LoadingBar = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 min-h-[300px] w-full max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[slideRight_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-gray-700 font-semibold">Carregando produtos...</p>
            
            <style>{`
                @keyframes slideRight {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(200%);
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingBar;