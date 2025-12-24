import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoginResponse, LoginRequest, SignupRequest, LogoutResponse } from "../../interfaces/auth";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    refresh: builder.mutation<LoginResponse, { signal?: AbortSignal }>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    logoutAll: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useLogoutMutation,
  useLogoutAllMutation,
} = authApi;