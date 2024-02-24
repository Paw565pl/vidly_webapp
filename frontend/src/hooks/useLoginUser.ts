import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { UserLoginFormValues } from "../schemas/UserSchema";
import authService from "../services/authService";

const useLoginUser = () => {
  const { setUserJwt } = useContext(AuthContext);

  return useMutation<string, AxiosError, UserLoginFormValues>({
    mutationFn: authService.add,
    onSuccess: (jwt) => setUserJwt(jwt),
  });
};

export default useLoginUser;
