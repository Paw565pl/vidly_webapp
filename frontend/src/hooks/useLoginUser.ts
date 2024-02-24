import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserLoginFormValues } from "../schemas/UserSchema";
import authService from "../services/authService";
import useCurrentUser from "./useCurrentUser";

const useLoginUser = () => {
  const { setUser } = useCurrentUser();

  return useMutation<string, AxiosError, UserLoginFormValues>({
    mutationFn: authService.add,
    onSuccess: (jwt) => setUser(jwt),
  });
};

export default useLoginUser;
