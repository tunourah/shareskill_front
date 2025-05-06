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
import EditServicePage from './pages/EditServicePage';
import PendingRequestsPage from "./pages/PendingRequestsPage";
import MyRequestsPage      from "./pages/MyRequestsPage";
import ReviewPage          from "./pages/ReviewPage";
import ActiveRequestsPage  from "./pages/ActiveRequestsPage";
import ServiceHistoryPage  from "./pages/ServiceHistoryPage";
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
    //   {
    //     path: "/services/:id",
    //     element: <>
    //       <NavBar user={user} setUser={setUser} />
    //       <ServiceDetail user={user} setUser={setUser}/>
    //     </>,
    //   },
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
    {
        path: "/services/:id/edit",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <EditServicePage />
        </>,
      },
       // ———————— REQUESTS FLOW ————————

 
       {
        path: "/requests/pending",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <PendingRequestsPage />
        </>,
      },
      {
        path: "/requests/active",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <ActiveRequestsPage />
        </>,
      },
      {
        path: "/requests/history",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <ServiceHistoryPage />
        </>,
      },
      {
        path: "/requests",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <MyRequestsPage />
        </>,
      },
      {
        path: "/requests/:id/review",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <ReviewPage />
        </>,
      },
    
      // finally, your catch-all service-detail route:
      {
        path: "/services/:id",
        element: <>
          <NavBar user={user} setUser={setUser} />
          <ServiceDetail user={user} />
        </>,
      },
  
  ]);

  return <RouterProvider router={router} />;
}

