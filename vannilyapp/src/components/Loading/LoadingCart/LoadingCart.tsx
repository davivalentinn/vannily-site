export const LoadingCart = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 min-h-[300px]">
            <div className="relative mb-4">
                <svg
                    className="w-16 h-16 text-background animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-background rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">Carregando produtos...</p>
        </div>
    );
};

export default LoadingCart;