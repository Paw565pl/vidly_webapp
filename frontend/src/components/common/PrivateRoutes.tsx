import { Navigate, Outlet, To } from "react-router-dom";

interface Props {
  condition: boolean;
  redirectTo: To;
}

const PrivateRoutes = ({ condition, redirectTo }: Props) =>
  condition ? <Outlet /> : <Navigate to={redirectTo} />;

export default PrivateRoutes;
