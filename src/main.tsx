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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
          { path: "/admin/movies/create", element: <CreateMovie /> }
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
