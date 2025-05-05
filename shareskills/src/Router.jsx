import { createBrowserRouter, RouterProvider } from "react-router-dom";

  
import ErrorPage  from './pages/ErrorPage';
import Home       from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage  from './pages/LoginPage';
import NavBar from "./components/NavBar"

export default function Router({ user, setUser }) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <> <NavBar user={user} setUser={setUser} /> <Home user={user} setUser={setUser} /></>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element:  <> <NavBar user={user} setUser={setUser} /> <SignupPage setUser={setUser} /></>,
    },
    {
      path: '/login',
      element:  <> <NavBar user={user} setUser={setUser} /> <LoginPage setUser={setUser} /></> ,
    },
  ]);
  return <RouterProvider router={router} />;
}
