import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./components/Customers";
import Movies from "./components/Movies";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import MovieForm from "./components/MovieForm";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Navigate to={"movies"} />,
    children: [
      { index: true, element: <Navigate to={"movies"} /> },
      { path: "movies", element: <Movies /> },
      { path: "movie/:id", element: <MovieForm/> },
      { path: "customers", element: <Customers /> },
      { path: "rentals", element: <Rentals /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);

export default router;
