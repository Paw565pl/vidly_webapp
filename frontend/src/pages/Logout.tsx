import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const Logout = () => {
  const { clearUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    clearUser();
    navigate(0);
    navigate("/");
  }, []);

  return <p>Logging you out...</p>;
};

export default Logout;
