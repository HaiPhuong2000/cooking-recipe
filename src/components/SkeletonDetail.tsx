export const SkeletonDetail = () => {
  return (
    <>
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8 bg-gray-200 animate-pulse">
        <div className="absolute bottom-6 left-6">
          <div className="h-10 bg-gray-300 rounded w-64 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-96"></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-pulse">
        <div className="flex flex-wrap items-center space-x-8 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-9">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded-xl w-24"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
