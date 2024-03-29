import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "./components/common/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Navigate to={"not-found"} />,
    children: [
      { index: true, element: <Navigate to={"movies"} /> },
      {
        path: "movies",
        lazy: async () => {
          const Movies = (await import("./pages/Movies")).default;
          return { element: <Movies /> };
        },
      },
      {
        path: "movies/:slug",
        lazy: async () => {
          const MovieForm = (await import("./pages/MovieForm")).default;
          return { element: <MovieForm /> };
        },
      },
      {
        path: "login",
        lazy: async () => {
          const Login = (await import("./pages/LoginForm")).default;
          return { element: <Login /> };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const Register = (await import("./pages/RegisterForm")).default;
          return { element: <Register /> };
        },
      },
      {
        path: "profile",
        lazy: async () => {
          const Profile = (await import("./pages/Profile")).default;
          return {
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          };
        },
      },
      {
        path: "customers",
        lazy: async () => {
          const Customers = (await import("./pages/Customers")).default;
          return { element: <Customers /> };
        },
      },
      {
        path: "rentals",
        lazy: async () => {
          const Rentals = (await import("./pages/Rentals")).default;
          return { element: <Rentals /> };
        },
      },
      {
        path: "not-found",
        lazy: async () => {
          const NotFound = (await import("./pages/NotFound")).default;
          return { element: <NotFound /> };
        },
      },
    ],
  },
]);

export default router;
