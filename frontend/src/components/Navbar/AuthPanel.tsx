import { NavLink } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

const AuthPanel = () => {
  const { getUser } = useCurrentUser();
  const loggedUser = getUser();

  return (
    <div className="d-flex">
      {loggedUser ? (
        <>
          <NavLink to={"/profile"} className={"nav-link"}>
            Profile
          </NavLink>
          <NavLink to={"/logout"} className={"nav-link"}>
            Logout
          </NavLink>
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
