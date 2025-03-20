import { Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { ContactUpdateInput } from "@/types/api";

const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchContact: builder.query<
      { payload: Prisma.ContactGetPayload<object> },
      void
    >({
      query: () => ({
        method: "GET",
        url: "/api/contact",
      }),
      providesTags: ["contact"],
    }),

    updateContact: builder.mutation<{ message: string }, ContactUpdateInput>({
      query: (data) => ({
        method: "PUT",
        url: "/api/contact",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {useFetchContactQuery,useUpdateContactMutation} = agentApiSlice;
