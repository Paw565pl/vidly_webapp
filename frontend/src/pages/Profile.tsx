import useCurrentUser from "../hooks/useCurrentUser";

const Profile = () => {
  const { getUser } = useCurrentUser();
  const loggedInUser = getUser();

  return <h1>Hi {loggedInUser?.name}</h1>;
};

export default Profile;
