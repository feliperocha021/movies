import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import movieReducer from "./features/movies/moviesSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { genreApi } from "./api/genreApi";
import { movieApi } from "./api/moviesApi";
import { uploadApi } from "./api/uploadApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(genreApi.middleware)
      .concat(movieApi.middleware)
      .concat(uploadApi.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
