import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

const Profile = () => {
  const { getUser } = useContext(AuthContext);
  const user = getUser();

  return <h1>Hi {user?.name}</h1>;
};

export default Profile;
