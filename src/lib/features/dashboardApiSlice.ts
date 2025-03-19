import { apiSlice } from "./apiSlice";
import {
  ActivityDataOutput,
  ChartDataOutput,
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
  }),
});

export const {
  useFetchStatisticsQuery,
  useFetchChartQuery,
  useFetchActivityQuery,
} = dashboardApiSlice;
