import { createApi } from "@reduxjs/toolkit/query/react";
import type { UpdateRequest, UserResponse, UsersResponse } from "../../interfaces/user";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => "/users",
    }),

    getUserById: builder.query<UserResponse, number>({
      query: (id: number) => `/users/${id}`
    }),

    updateMe: builder.mutation<UserResponse, UpdateRequest>({
      query: (updatedData) => ({
        url: "/users/me",
        method: "PUT",
        body: updatedData,
      }),
    }),

    getMe: builder.mutation<UserResponse, void>({
      query: () => "/users/me"
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateMeMutation,
  useGetMeMutation,
} = userApi;