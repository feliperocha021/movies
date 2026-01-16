import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import type { 
  IReviewRequest,
  MovieDeleteResponse, 
  MovieRequest, 
  MovieResponse, 
  MoviesResponse, 
  ReviewDeleteResponse, 
  ReviewResponse
} from "../../interfaces/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMovies: builder.query<MoviesResponse, void>({
      query: () => "/movies"
    }),

    getNewMovies: builder.query<MoviesResponse, void>({
      query: () => "/movies/latest"
    }),

    getTopMovies: builder.query<MoviesResponse, void>({
      query: () => "/movies/top"
    }),

    getRandomMovies: builder.query<MoviesResponse, void>({
      query: () => "/movies/random"
    }),

    createMovie: builder.mutation<MovieResponse, MovieRequest>({
      query: (newMovie) => ({
        url: "/movies",
        method: "POST",
        body: newMovie,
      }),
    }),

    getMovieById: builder.query<MovieResponse, string>({
      query: (id: string) => `/movies/${id}`
    }),

    updateMovie: builder.mutation<MovieResponse, { id: string, movieUpdated: MovieRequest }>({
      query: ({ id, movieUpdated }) => ({
        url: `/movies/${id}`,
        method: "PUT",
        body: movieUpdated,
      }),
    }),

    deleteMovie: builder.mutation<MovieDeleteResponse, string>({
      query: (id: string) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
    }),

    createMovieReview: builder.mutation<ReviewResponse, { id: string, newReview: IReviewRequest }>({
      query: ({ id, newReview }) => ({
        url: `/movies/${id}/reviews`,
        method: "POST",
        body: newReview,
      }),
    }),
    
    updateMovieReview: builder.mutation<ReviewResponse, { id: string, newReview: IReviewRequest }>({
      query: ({ id, newReview }) => ({
        url: `/movies/${id}/reviews`,
        method: "PUT",
        body: newReview,
      }),
    }),
    
    deleteMovieReview: builder.mutation<ReviewDeleteResponse, { movieId: string, reviewId: string }>({
      query: ({ movieId, reviewId }) => ({
        url: `/movies/${movieId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useCreateMovieMutation,
  useGetMovieByIdQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useCreateMovieReviewMutation,
  useUpdateMovieReviewMutation,
  useDeleteMovieReviewMutation,
} = movieApi;