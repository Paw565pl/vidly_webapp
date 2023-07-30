import jwt_decode from "jwt-decode";
import Auth from "../entities/Auth";

const localStorageId = "token";

const useCurrentUser = () => {
  const setUser = (jwt: Auth) => localStorage.setItem(localStorageId, jwt);
  const getUser = () => {
    const currUser = localStorage.getItem(localStorageId);
    if (!currUser) return;
    return jwt_decode(currUser);
  };
  const clearUser = () => localStorage.removeItem(localStorageId);

  return { setUser, getUser, clearUser };
};

export default useCurrentUser;
