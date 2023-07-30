import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const Logout = () => {
  const { getUser, clearUser } = useCurrentUser();
  if (!getUser()) return <Navigate to={"/"} />;

  useEffect(() => {
    clearUser();
    window.location.href = "/";
  }, []);

  return <p>Logging you out...</p>;
};

export default Logout;
