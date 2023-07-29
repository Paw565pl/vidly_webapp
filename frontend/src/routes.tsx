import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import RegisterForm from "./components/RegisterForm";
import Customers from "./pages/Customers";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
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
      { path: "customers", element: <Customers /> },
      { path: "rentals", element: <Rentals /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);

export default router;
