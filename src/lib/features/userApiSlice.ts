import { apiSlice } from "./apiSlice";
import { UsersDataOutput } from "@/types/api";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<UsersDataOutput, { search: string }>({
      query: ({ search }) => ({
        method: "GET",
        url: `/api/users?search=${search}`,
      }),
    }),
  }),
});

export const { useFetchUsersQuery } = userApiSlice;
