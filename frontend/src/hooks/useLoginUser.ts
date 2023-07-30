import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Auth, { UserLoginData } from "../entities/Auth";
import authService from "../services/authService";
import useCurrentUser from "./useCurrentUser";

const { setUser } = useCurrentUser();

const useLoginUser = () =>
  useMutation<Auth, AxiosError, UserLoginData>({
    mutationFn: authService.add,
    onSuccess: (jwt) => setUser(jwt),
  });

export default useLoginUser;
