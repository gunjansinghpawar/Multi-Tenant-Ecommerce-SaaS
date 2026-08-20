import React from 'react';

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 8 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 foldable:grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 large-desktop:grid-cols-6 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-[3/4] w-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-auto"></div>
        </div>
      ))}
    </div>
  );
}
