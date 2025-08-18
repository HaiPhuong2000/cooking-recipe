export const Skeleton = () => {
  return (
    <div className="max-w-sm h-full bg-white border-gray-200 !rounded-2xl shadow-lg border-0 overflow-hidden ">
      <div className="relative">
        <div className="h-70 w-full bg-gray-200 animate-pulse rounded-t-lg"></div>
        <div className="absolute top-3 right-3">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>

        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
        </div>

        <div className="flex">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
