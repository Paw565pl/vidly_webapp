import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Auth, { UserLoginData } from "../entities/Auth";
import authService from "../services/authService";
import useCurrentUser from "./useCurrentUser";

const useLoginUser = () => {
  const { setUser } = useCurrentUser();

  return useMutation<Auth, AxiosError, UserLoginData>({
    mutationFn: authService.add,
    onSuccess: (jwt) => setUser(jwt),
  });
};

export default useLoginUser;
