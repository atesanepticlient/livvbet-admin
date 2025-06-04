import { apiSlice } from "./apiSlice";
import {
  ActivityDataOutput,
  ChartDataOutput,
  DashboardOverviewQueryParams,
  DashboardOverviewResponse,
  StatisticsDataOutput,
} from "@/types/api";

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStatistics: builder.query<StatisticsDataOutput, void>({
      query: () => ({
        method: "GET",
        url: "/api/dashboard/statistics",
      }),
    }),
    fetchChart: builder.query<ChartDataOutput, void>({
      query: () => ({
        method: "GET",
        url: "/api/dashboard/chart",
      }),
    }),
    fetchActivity: builder.query<ActivityDataOutput, void>({
      query: () => ({
        method: "GET",
        url: "/api/dashboard/activity",
      }),
    }),
    fetchDashboard: builder.query<
      DashboardOverviewResponse,
      DashboardOverviewQueryParams
    >({
      query: ({ endDate, startDate, paymentFilter }) => ({
        url: `/api/dashboard?startDate=${startDate}&endDate=${endDate}&payment-filter=${paymentFilter}&year=2025`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchDashboardQuery,
  useFetchStatisticsQuery,
  useFetchChartQuery,
  useFetchActivityQuery,
} = dashboardApiSlice;
