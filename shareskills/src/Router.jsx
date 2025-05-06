// src/Router.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import ErrorPage      from "./pages/ErrorPage";
import Home           from "./pages/Home";
import SignupPage     from "./pages/SignupPage";
import LoginPage      from "./pages/LoginPage";
import NavBar         from "./components/NavBar";
import ServicePage from "./pages/ServicePage";
import UserPage       from "./pages/UserPage";
import MyListingsPage from "./pages/MyListingsPage";

export default function Router({ user, setUser }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <NavBar user={user} setUser={setUser} />
        <Home    user={user} setUser={setUser} />
      </>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <>
        <NavBar user={user} setUser={setUser} />
        <SignupPage setUser={setUser} />
      </>,
    },
    {
      path: "/login",
      element: <>
        <NavBar user={user} setUser={setUser} />
        <LoginPage setUser={setUser} />
      </>,
    },
    {
      path: "/serviceform",
      element: <>
        <NavBar user={user} setUser={setUser} />
        <ServicePage setUser={setUser} />
      </>,
    },
    
    {
        path: "/my-listings",
        element: user
          ? <>
              <NavBar user={user} setUser={setUser} />
              <MyListingsPage user={user} setUser={setUser} />
            </>
          : <Navigate to="/login" replace />
      },
    // ←—— protected route
    {
      path: "/userpage",
      element: user
        ? <>
            <NavBar    user={user} setUser={setUser} />
            <UserPage  user={user} setUser={setUser} />
          </>
        : <Navigate to="/login" replace />
    },
  ]);

  return <RouterProvider router={router} />;
}
