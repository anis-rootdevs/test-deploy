export default function DropdownSearchSkelton() {
  return (
    <div className="space-y-2 p-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="w-full bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded animate-pulse"
        >
          <div className="flex items-center gap-3">
            {/* Image Skeleton */}
            <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-slate-800"></div>

            {/* Content Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
