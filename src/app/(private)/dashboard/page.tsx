/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFetchDashboardQuery } from "@/lib/features/dashboardApiSlice";
import { useState } from "react";
import StatisticCard from "./statistic-card";
import CookieLoader from "@/components/loader/cooki-loader";
import DepositWithdrawChart from "./deposit-withdraw-chart";
import ChartFilter from "./chart-filter";

export default function Dashboard() {
  const [paymentChartFilter, setPaymentChartFilter] = useState("7days");

  const { data: dashboard, isLoading } = useFetchDashboardQuery({
    startDate: "",
    endDate: "",
    paymentFilter: paymentChartFilter,
  });
  console.log({ dashboard });
  const dashboardStatistic = dashboard?.statistics as any;

  return (
    <div className="grid items-start gap-6 p-6 text-white  min-h-screen">
      {!dashboard && isLoading && <CookieLoader />}
      {dashboard && !isLoading && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dashboardStatistic &&
              Object.keys(dashboardStatistic).map((key, i) => (
                <StatisticCard
                  key={i}
                  statistic={dashboardStatistic[key]}
                  title={[key].toString()}
                />
              ))}
          </div>
          <ChartFilter
            onSelect={(value) => {
              if (value !== paymentChartFilter) {
                setPaymentChartFilter(value);
              }
            }}
            defaultValue={dashboard.depositWithdraw.filter}
          />
          <DepositWithdrawChart
            filter={dashboard.depositWithdraw.filter}
            data={dashboard.depositWithdraw.data}
          />
        </>
      )}

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Chart />
        <Activity />
      </div> */}
    </div>
  );
}
