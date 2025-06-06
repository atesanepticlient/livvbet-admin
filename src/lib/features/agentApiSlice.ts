import { Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { AgentsDataOutput, AgentsUpdateInput } from "@/types/api";

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
    fetchAgent: builder.query<
      { payload: Prisma.agentGetPayload<{ include: { agent: true } }> },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `api/agents/${id}`,
        method: "GET",
      }),
      providesTags: ["agent"],
    }),

    fetchAgents: builder.query<AgentsDataOutput, void>({
      query: () => ({
        url: `api/agents`,
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
  }),
});

export const {
  useFetchUnVerifiedAgentsQuery,
  useUpdateVerifiedAgentsMutation,
  useFetchAgentQuery,
  useFetchAgentsQuery,
  useSearchAgentsQuery,
  useDepositToWalletMutation,
} = agentApiSlice;
