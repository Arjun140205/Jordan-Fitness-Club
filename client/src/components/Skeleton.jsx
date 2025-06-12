const Skeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
      <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
    </div>
  );
};

export default Skeleton;
