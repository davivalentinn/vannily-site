import ProductCardShimmer from "../ProductCardShimmer";

export const ProductGridShimmer = ({ count = 4 }) => {
    return (
        <div className="w-full py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="h-9 bg-gray-300 rounded w-48 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <ProductCardShimmer key={index} />
                    ))}
                </div>
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

export default ProductGridShimmer