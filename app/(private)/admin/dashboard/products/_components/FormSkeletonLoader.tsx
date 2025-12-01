export default function FormSkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>

      {/* Name + Price Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>

      {/* Category Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        <div className="h-11 bg-gray-200 rounded"></div>
      </div>

      {/* Tags Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-end">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}
