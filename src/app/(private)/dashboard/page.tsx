"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchStatisticsQuery } from "@/lib/features/dashboardApiSlice";
import StatisticSkeleton from "./statistic-skeleton";
import { Chart } from "./chart";
import Activity from "./activity";

export default function Dashboard() {
  const { data, isLoading } = useFetchStatisticsQuery();
  const payload = data?.payload;
  console.log("St", payload);
  return (
    <div className="grid gap-6 p-6 text-white  min-h-screen">
      {!data && isLoading && <StatisticSkeleton />}
      {data && !isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {payload?.map((s, i) => (
            <Card className="gap-3" key={i}>
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl md:text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">
                  {s.change}% {s.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Chart />
        <Activity />
      </div>
    </div>
  );
}
