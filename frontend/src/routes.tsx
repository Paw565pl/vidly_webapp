import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./components/Customers";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import NotFound from "./components/NotFound";
import RegisterForm from "./components/RegisterForm";
import Rentals from "./components/Rentals";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Navigate to={"not-found"} />,
    children: [
      { index: true, element: <Navigate to={"movies"} /> },
      { path: "movies", element: <Movies /> },
      { path: "movie/:slug", element: <MovieForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "customers", element: <Customers /> },
      { path: "rentals", element: <Rentals /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);

export default router;
