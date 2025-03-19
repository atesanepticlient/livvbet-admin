"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchChartQuery } from "@/lib/features/dashboardApiSlice";

const chartConfig = {
  deposit: {
    label: "Deposit",
    color: "hsl(var(--chart-1))",
  },
  withdraw: {
    label: "Withdraw",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const { data } = useFetchChartQuery();
  const payload = data?.payload;

  const chartData: Array<{ month: string; desktop: number; mobile: number }> =
    [];

  payload?.forEach((p) => {
    chartData.push({ month: p.month, desktop: p.deposit, mobile: p.withdraw });
  });

  const totalWithdraw = payload?.reduce((acc, i) => i.withdraw + acc, 0);
  const totalDeposit = payload?.reduce((acc, i) => i.deposit + acc, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw - Deposit</CardTitle>
        {payload && (
          <CardDescription>
            {payload![0].month} - {payload![payload?.length - 1].month}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={payload && payload.length > 0 ? payload : chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Deposits : {totalWithdraw} and Total Withdraws : {totalDeposit}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total payments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
