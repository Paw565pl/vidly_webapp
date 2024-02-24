import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

const Logout = () => {
  const { clearUserJwt } = useContext(AuthContext);
  clearUserJwt();

  return <Navigate to={"/movies"} />;
};

export default Logout;
