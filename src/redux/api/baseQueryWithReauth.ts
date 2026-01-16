import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/authSlice";
import type { RootState } from "../store";
import { getErrorMessage } from "../../utils/errorHandler";
import type { IUser } from "../../interfaces/user";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Controller global para refresh
let refreshController: AbortController | null = null;

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const url = typeof args === "string" ? args : args.url;

    // não tenta refresh em login/signup
    if (url?.includes("/auth/login") || url?.includes("/auth/signup") || url?.includes("/auth/refresh")) {
      return result;
    }

    // aborta refresh anterior se ainda estiver rodando
    if (refreshController) {
      refreshController.abort();
    }
    refreshController = new AbortController();

    try {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST", signal: refreshController.signal },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as { accessToken: string; user: IUser };
        api.dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }));

        // refaz a requisição original
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Erro no refresh:", getErrorMessage(refreshResult.error));
        api.dispatch(logout());
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.warn("Refresh abortado por duplicidade");
      } else {
        console.error("Erro inesperado no refresh:", getErrorMessage(err));
        console.log("chamando logout");
        api.dispatch(logout());
        console.log("logout chamado");
      }
    } finally {
      refreshController = null;
    }
  }

  return result;
};
