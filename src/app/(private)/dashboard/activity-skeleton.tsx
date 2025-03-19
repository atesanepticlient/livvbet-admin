import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ActivitySkeleton = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <Skeleton className="w-full h-[35px] rounded-sm" />
      <Skeleton className="w-full h-[35px] rounded-sm" />
      <Skeleton className="w-full h-[35px] rounded-sm" />
      <Skeleton className="w-full h-[35px] rounded-sm" />
      <Skeleton className="w-full h-[35px] rounded-sm" />
    </div>
  );
};

export default ActivitySkeleton;
