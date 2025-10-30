import React from "react";

// Skeleton Card for Menu Items (matches your horizontal card design)
export const MenuItemCardSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div className={`flex gap-4 items-start animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] flex-shrink-0 rounded-sm bg-gray-300 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-800 p-4 md:p-5 rounded-sm min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/5"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>

        {/* Dotted Line */}
        <div className="border-b border-dotted border-gray-300 dark:border-gray-600 mb-3"></div>

        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Grid for Multiple Items
export const MenuItemsGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="max-w-[1320px] mx-auto py-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Array.from({ length: count }).map((_, index) => (
          <MenuItemCardSkeleton
            key={index}
            className="bg-[#FAF8F5] dark:bg-[#181C20]"
          />
        ))}
      </div>
    </div>
  );
};

// Skeleton for Full Section (like Offers, Sweets sections)
export const CategorySectionSkeleton = () => {
  return (
    <div className="py-16 px-4 animate-pulse">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Title */}
        <div className="mb-10 text-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto max-w-full"></div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
