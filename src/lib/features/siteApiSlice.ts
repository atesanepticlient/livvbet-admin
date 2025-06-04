import { Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";

const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSite: builder.query<{ payload: Prisma.SiteGetPayload<object> }, void>({
      query: () => ({
        url: "/api/site",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchSiteQuery } = agentApiSlice;
