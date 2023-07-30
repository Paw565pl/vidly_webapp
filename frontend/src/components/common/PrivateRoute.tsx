import { ReactNode } from "react";
import { Navigate, To } from "react-router-dom";

interface Props {
  condition: boolean;
  element: ReactNode;
  redirectTo: To;
}

const PrivateRoute = ({ condition, element, redirectTo }: Props) =>
  condition ? element : <Navigate to={redirectTo} />;

export default PrivateRoute;
