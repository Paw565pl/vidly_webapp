import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./pages/Customers";
import LoginForm from "./pages/Login";
import Logout from "./pages/Logout";
import MovieForm from "./pages/MovieForm";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import RegisterForm from "./pages/Register";
import Rentals from "./pages/Rentals";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Navigate to={"not-found"} />,
    children: [
      { index: true, element: <Navigate to={"movies"} /> },
      { path: "movies", element: <Movies /> },
      { path: "movies/:slug", element: <MovieForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "profile", element: <Profile /> },
      { path: "logout", element: <Logout /> },
      { path: "customers", element: <Customers /> },
      { path: "rentals", element: <Rentals /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);

export default router;
