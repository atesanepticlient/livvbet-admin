import { Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import {  AgentsUpdateInput } from "@/types/api";

const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUnVerifiedAgents: builder.query<
      { payload: Prisma.agentGetPayload<object>[] },
      void
    >({
      query: () => ({
        url: `api/agents/pending`,
        method: "GET",
      }),
      providesTags: ["agent"],
    }),
    updateVerifiedAgents: builder.mutation<object, AgentsUpdateInput>({
      query: (body) => ({
        url: `api/agents/pending`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["agent"],
    }),
    fetchAgent: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `api/agents/${id}`,
        method: "GET",
      }),
      providesTags: ["agent"],
    }),
    banAgent: builder.mutation({
      query: (id) => ({
        url: `/api/agents/${id}/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["agent"],
    }),
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/api/agents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["agent"],
    }),
    fetchAgents: builder.query<any, any>({
      query: ({ search, isActive }) => ({
        url: `api/agents`,
        params: { search, isActive },

        method: "GET",
      }),
    }),

    searchAgents: builder.query({
      query: (query) => `/api/deposit?query=${query}`,
      providesTags: ["agent"],
    }),
    depositToWallet: builder.mutation({
      query: (body) => ({
        url: "/api/deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["agent", "AgentWallet"],
    }),
    getAgentsPayoutRequests: builder.query({
      query: ({ page = 1, limit = 10, status }) =>
        `/api/agents/payouts?page=${page}&limit=${limit}${
          status ? `&status=${status}` : ""
        }`,
      providesTags: ["agentPayouts"],
    }),
    updateWithdrawalRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/agents/payouts/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["agentPayouts"],
    }),

    getPendingAgents: builder.query({
      query: () => "/api/agents/pending",
      providesTags: ["agent"],
    }),
    verifyAgent: builder.mutation({
      query: ({ id, action }) => ({
        url: `/api/agents/${id}/verify`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["agent"],
    }),
  }),
});

export const {
  useFetchUnVerifiedAgentsQuery,
  useUpdateVerifiedAgentsMutation,
  useFetchAgentQuery,
  useFetchAgentsQuery,
  useSearchAgentsQuery,
  useDepositToWalletMutation,
  useGetAgentsPayoutRequestsQuery,
  useUpdateWithdrawalRequestStatusMutation,
  useBanAgentMutation,
  useDeleteAgentMutation,
  useGetPendingAgentsQuery,
  useVerifyAgentMutation,
} = agentApiSlice;
