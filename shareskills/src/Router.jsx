import { createBrowserRouter, RouterProvider } from "react-router-dom";

  
import ErrorPage  from './pages/ErrorPage';
import Home       from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage  from './pages/LoginPage';

export default function Router({ user, setUser }) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <SignupPage setUser={setUser} />,
    },
    {
      path: '/login',
      element: <LoginPage  user={user} setUser={setUser} />,
    },
  ]);
  return <RouterProvider router={router} />;
}
