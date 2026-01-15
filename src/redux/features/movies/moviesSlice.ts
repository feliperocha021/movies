import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMovie } from "../../../interfaces/movie";

interface MoviesState {
  moviesFilter: {
    searchTerm: string;
    selectedGenre: string;
    selectedYear?: number;
    selectedSort: string[];
  },
  filteredMovies: IMovie[],
  movieYears: number[],
  uniqueYears: number[],
}

const initialState: MoviesState = {
  moviesFilter: {
    searchTerm: "",
    selectedGenre: "",
    selectedYear: undefined,
    selectedSort: [],
  },
  filteredMovies: [],
  movieYears: [],
  uniqueYears: [],
} 

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesFilter: (state, action: PayloadAction<Partial<MoviesState["moviesFilter"]>>) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload }
    },
    setFilteredMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.filteredMovies = action.payload;
    },
    setMovieYears: (state, action: PayloadAction<number[]>) => {
      state.movieYears = action.payload;
    },
    setUniqueYears: (state, action: PayloadAction<number[]>) => {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setFilteredMovies,
  setMoviesFilter,
  setMovieYears,
  setUniqueYears,
} = moviesSlice.actions

export default moviesSlice.reducer;
