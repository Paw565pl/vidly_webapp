import { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

const Logout = () => {
  const { clearUser } = useCurrentUser();

  useEffect(() => {
    clearUser();
    window.location.href = "/";
  }, []);

  return <p>Logging you out...</p>;
};

export default Logout;
