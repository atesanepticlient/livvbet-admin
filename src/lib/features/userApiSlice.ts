import { apiSlice } from "./apiSlice";
import {
  FetchUserOutput,
  UsersDataOutput,
  UsersFetchInput,
  UserSuspensionInput,
} from "@/types/api";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<UsersDataOutput, UsersFetchInput>({
      query: (params) => ({
        method: "GET",
        url: `/api/users?search=${params.search}&status=${params.status}&page=${params.page}&limit=${params.limit}`,
      }),
      providesTags: ["user"],
    }),

    fetchUser: builder.query<FetchUserOutput, { id: string }>({
      query: (params) => ({
        method: "GET",
        url: `/api/users/${params.id}`,
      }),
      providesTags: ["user"],
    }),

    userSuspention: builder.mutation<{ success: true }, UserSuspensionInput>({
      query: ({ id, actionType, message }) => ({
        url: `/api/users/${id}/suspension`,
        method: "PUT",
        body: { actionType, message },
      }),
      invalidatesTags: ["user"],
    }),

    createMessage: builder.mutation<
      { success: true },
      { message: string; userId: string }
    >({
      query: (body) => ({
        url: "/api/message",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),

    userRecharge: builder.mutation<
      { success: boolean },
      { message?: string; amount: number; id: string }
    >({
      query: (body) => ({
        url: "/api/recharge/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserQuery,
  useUserSuspentionMutation,
  useUserRechargeMutation,
  useCreateMessageMutation,
} = userApiSlice;
