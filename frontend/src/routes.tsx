import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "./components/common/PrivateRoute";
import useCurrentUser from "./hooks/useCurrentUser";
import Customers from "./pages/Customers";
import LoginForm from "./pages/LoginForm";
import Logout from "./pages/Logout";
import MovieForm from "./pages/MovieForm";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import RegisterForm from "./pages/RegisterForm";
import Rentals from "./pages/Rentals";

const { getUser } = useCurrentUser();
const isUser = !!getUser();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Navigate to={"not-found"} />,
    children: [
      { index: true, element: <Navigate to={"movies"} /> },
      { path: "movies", element: <Movies /> },
      { path: "movies/:slug", element: <MovieForm /> },
      {
        path: "login",
        element: (
          <PrivateRoute
            condition={!isUser}
            element={<LoginForm />}
            redirectTo={"/"}
          />
        ),
      },
      {
        path: "register",
        element: (
          <PrivateRoute
            condition={!isUser}
            element={<RegisterForm />}
            redirectTo={"/"}
          />
        ),
      },
      { path: "profile", element: <Profile /> },
      {
        path: "logout",
        element: (
          <PrivateRoute
            condition={isUser}
            element={<Logout />}
            redirectTo={"/"}
          />
        ),
      },
      { path: "customers", element: <Customers /> },
      { path: "rentals", element: <Rentals /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);

export default router;
