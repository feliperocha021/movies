import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider, createBrowserRouter} from "react-router-dom";

import Home from './pages/Home.tsx'
import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'
import PrivateRoute from './pages/Auth/PrivateRoute.tsx'
import Profile from './pages/Auth/Profile.tsx'
import ChangePassword from './pages/Auth/ChangePassword.tsx'
import AdminRoute from './pages/Admin/AdminRoute.tsx'
import GenreList from './pages/Admin/GenreList.tsx'
import CreateMovie from './pages/Admin/CreateMovie.tsx'
import AdminMoviesList from './pages/Admin/AdminMoviesList.tsx'
import UpdateMovie from './pages/Admin/UpdateMovie.tsx'
import AllMovies from './pages/Movies/AllMovies.tsx'
import MovieDetails from './pages/Movies/MovieDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies", element: <AllMovies /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "change-password", element: <ChangePassword /> }
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          { path: "/admin/movies/genre", element: <GenreList /> },
          { path: "/admin/movies/create", element: <CreateMovie /> },
          { path: "/admin/movies-list", element: <AdminMoviesList /> },
          { path: "/admin/movies/update/:id", element: <UpdateMovie /> },
          { path: "/movies/:id", element: <MovieDetails /> },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
