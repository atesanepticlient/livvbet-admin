import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StatisticSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border shadow-sm">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className=" p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center"
          >
            <Skeleton className="h-6 w-24 mb-4  rounded-xl" />
            <Skeleton className="h-10 w-32 mb-2  rounded-xl" />
            <Skeleton className="h-4 w-28  rounded-xl" />
          </div>
        ))}
    </div>
  );
};

export default StatisticSkeleton;
