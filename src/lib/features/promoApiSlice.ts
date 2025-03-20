
import { apiSlice } from "./apiSlice";
import {  PromoUpdateInput } from "@/types/api";

const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePromo: builder.mutation<{ message: string }, PromoUpdateInput>({
      query: (body) => ({
        url: "/api/promo",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useUpdatePromoMutation } = agentApiSlice;
