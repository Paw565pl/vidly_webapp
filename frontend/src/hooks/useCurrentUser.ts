import jwt_decode from "jwt-decode";
import AuthToken from "../entities/Auth";
import User from "../entities/User";

interface DecodedUser extends User {
  iat: number;
}

const tokenKey = "token";

const useCurrentUser = () => {
  const setUser = (jwt: AuthToken) => localStorage.setItem(tokenKey, jwt);
  const getUser = (): DecodedUser | null => {
    const currUser = localStorage.getItem(tokenKey);
    if (!currUser) return null;
    try {
      return jwt_decode(currUser);
    } catch (err) {
      return null;
    }
  };
  const getUserJwt = () => localStorage.getItem(tokenKey);
  const clearUser = () => localStorage.removeItem(tokenKey);

  return { setUser, getUser, getUserJwt, clearUser };
};

export default useCurrentUser;
