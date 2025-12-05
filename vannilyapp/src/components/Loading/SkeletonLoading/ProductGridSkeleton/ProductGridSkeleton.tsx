import ProductCardSkeleton from "../ProductCardSkeleton";

export const ProductGridSkeleton = ({ count = 4 }) => {
    return (
        <div className="w-full py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <div className="h-9 bg-gray-300 rounded w-48 animate-pulse"></div>
                    
                    <div className="flex gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Grid de cards skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGridSkeleton