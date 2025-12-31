import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import type { GenreRequest, GenreDeleteResponse, GenreResponse, GenresResponse } from "../../interfaces/genre";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createGenre: builder.mutation<GenreResponse, GenreRequest>({
      query: (genre) => ({
        url: "/genres",
        method: "POST",
        body: genre,
      }),
    }),

    getAllGenres: builder.query<GenresResponse, void>({
      query: () => "/genres"
    }),

    getGenreById: builder.query<GenreResponse, string>({
      query: (id: string) => `/genres/${id}`
    }),

    updateGenre: builder.mutation<GenreResponse, { id: string, genreUpdated: GenreRequest }>({
      query: ({ id, genreUpdated }) => ({
        url: `/genres/${id}`,
        method: "PUT",
        body: genreUpdated,
      }),
    }),

    deleteGenre: builder.mutation<GenreDeleteResponse, string>({
      query: (id: string) => ({
        url: `/genres/${id}`,
        method: "DELETE",
      })
    })
  }),
})

export const {
  useCreateGenreMutation,
  useGetAllGenresQuery,
  useGetGenreByIdQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApi;
