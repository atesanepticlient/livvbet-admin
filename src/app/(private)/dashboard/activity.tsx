"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchActivityQuery } from "@/lib/features/dashboardApiSlice";
import ActivitySkeleton from "./activity-skeleton";
const Activity = () => {
  const { data, isLoading } = useFetchActivityQuery();
  const payload = data?.payload;
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <p className="text-sm text-muted-foreground">
          Some recent Payments of your site
        </p>
      </CardHeader>
      {isLoading && !data && <ActivitySkeleton />}
      {payload && !isLoading && (
        <CardContent>
          <div className="space-y-4">
            {payload.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium capitalize">{p.type}</p>
                  <span className="text-muted-foreground text-xs">
                    {p.user.email}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {p.user.wallet?.currencyCode} {p.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      {!isLoading && payload?.length == 0 && (
        <span className="text-center block py-4 text-xs">No Activity</span>
      )}
    </Card>
  );
};

export default Activity;
