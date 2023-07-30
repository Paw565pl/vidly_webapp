import { Navigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const Profile = () => {
  const { getUser } = useCurrentUser();
  const loggedInUser = getUser();
  if (!loggedInUser) return <Navigate to={"/"} />;

  return <h1>Hi {loggedInUser.name}</h1>;
};

export default Profile;
