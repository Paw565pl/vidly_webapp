import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

const AuthPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, clearUserJwt } = useContext(AuthContext);

  const handleLogout = () => {
    clearUserJwt();
    navigate("/movies");
  };

  return (
    <div className="d-flex">
      {isAuthenticated ? (
        <>
          <NavLink to={"/profile"} className={"nav-link"}>
            Profile
          </NavLink>
          <button className={"nav-link"} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to={"/login"} className={"nav-link"}>
            Login
          </NavLink>
          <NavLink to={"/register"} className={"nav-link"}>
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AuthPanel;
