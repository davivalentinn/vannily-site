
export const LoadingDots = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 min-h-[300px]">
            <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-[pulse_1s_ease-in-out_infinite_0ms]"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-[pulse_1s_ease-in-out_infinite_200ms]"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-[pulse_1s_ease-in-out_infinite_400ms]"></div>
            </div>
            <p className="text-gray-700 font-semibold">Carregando produtos...</p>
        </div>
    );
};

export default LoadingDots;