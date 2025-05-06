// src/Router.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import ErrorPage      from "./pages/ErrorPage";
import Home           from "./pages/Home";
import SignupPage     from "./pages/SignupPage";
import LoginPage      from "./pages/LoginPage";
import NavBar         from "./components/NavBar";
import ServicePage from "./pages/NewServicePage";
import UserPage       from "./pages/UserPage";
import MyListingsPage from "./pages/MyListingsPage";
import Services from "./pages/Services";
import ServiceDetail from './pages/ServiceDetail.jsx';

export default function Router({ user, setUser, loggingIn }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <NavBar user={user} setUser={setUser} />
        <Home    />
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
        path: "/services",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <Services  setUser={setUser}/>
        </>,
      },
      {
        path: "/services/:id",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <ServiceDetail  setUser={setUser}/>
        </>,
      },
    {
      path: "/login",
      element: <>
        <NavBar user={user} setUser={setUser} loggingIn={true} />
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
        element: <>
              <NavBar user={user} setUser={setUser} />
              <MyListingsPage user={user} setUser={setUser} />
            </>
      },
    // ←—— protected route
    {
      path: "/userpage",
      element: <>
            <NavBar    user={user} setUser={setUser} />
            <UserPage  user={user} setUser={setUser} />
          </>
    },
  ]);

  return <RouterProvider router={router} />;
}

