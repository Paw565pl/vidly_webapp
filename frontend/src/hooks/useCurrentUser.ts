import jwt_decode from "jwt-decode";
import Auth from "../entities/Auth";
import User from "../entities/User";

interface DecodedUser extends User {
  iat: number;
}

const localStorageId = "token";

const useCurrentUser = () => {
  const setUser = (jwt: Auth) => localStorage.setItem(localStorageId, jwt);
  const getUser = (): DecodedUser | null => {
    const currUser = localStorage.getItem(localStorageId);
    if (!currUser) return null;
    try {
      return jwt_decode(currUser);
    } catch (err) {
      return null;
    }
  };
  const clearUser = () => localStorage.removeItem(localStorageId);

  return { setUser, getUser, clearUser };
};

export default useCurrentUser;
