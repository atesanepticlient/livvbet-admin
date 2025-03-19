import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search Input Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/3" />
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="h-10 w-30" />
          <Skeleton className="h-10 w-30" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-gray-800 rounded-lg p-4">
        {/* Table Header Skeleton */}
        <div className="flex justify-between px-4 py-2 border-b border-gray-700">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/6" />
        </div>

        {/* Table Row Skeleton */}
        <div className="flex justify-between px-4 py-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/6" />
        </div>
        <div className="flex justify-between px-4 py-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/6" />
        </div>
        <div className="flex justify-between px-4 py-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/6" />
        </div>
      </div>

      {/* Pagination Buttons Skeleton */}
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
