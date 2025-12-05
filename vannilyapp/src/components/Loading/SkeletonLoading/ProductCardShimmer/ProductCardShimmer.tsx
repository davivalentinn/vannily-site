export const ProductCardShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-[520px] flex flex-col relative">
            {/* Overlay de brilho */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            
            {/* Imagem skeleton */}
            <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-3 left-3 bg-gray-300 rounded-full w-16 h-8"></div>
                <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-10 h-10"></div>
            </div>

            <div className="p-4 flex flex-col flex-1 space-y-3">
                <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                </div>

                <div className="flex gap-2">
                    <div className="h-7 bg-gray-200 rounded-xl w-20"></div>
                    <div className="h-7 bg-gray-200 rounded-xl w-24"></div>
                    <div className="h-7 bg-gray-200 rounded-xl w-16"></div>
                </div>

                <div className="flex-1"></div>

                <div className="space-y-2">
                    <div className="h-8 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>

                <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
            </div>

            <style>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductCardShimmer