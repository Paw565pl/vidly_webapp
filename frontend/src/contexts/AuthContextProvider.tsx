import { jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useEffect, useState } from "react";
import User from "../entities/User";
import { axiosInstance } from "../services/apiClient";

interface DecodedUser extends User {
  iat: number;
}

interface AuthContext {
  isAuthenticated: boolean;
  getUser: () => DecodedUser | null;
  setUserJwt: (jwt: string) => void;
  clearUserJwt: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const tokenKey = "token";
export const getUserJwt = () => localStorage.getItem(tokenKey);

const AuthContextProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        if (response.status === 200) setIsAuthenticated(true);
      } catch (error) {
        clearUserJwt();
      }
    };

    checkAuth();
  }, []);

  const getUser = (): DecodedUser | null => {
    const currentUser = localStorage.getItem(tokenKey);
    if (!currentUser) return null;

    try {
      return jwtDecode(currentUser);
    } catch (err) {
      return null;
    }
  };

  const setUserJwt = (jwt: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(tokenKey, jwt);
  };

  const clearUserJwt = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(tokenKey);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getUser, setUserJwt, clearUserJwt }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
