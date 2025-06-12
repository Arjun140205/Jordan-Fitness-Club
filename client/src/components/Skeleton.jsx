const Skeleton = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
