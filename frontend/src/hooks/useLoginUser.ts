import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Auth, { UserLoginData } from "../entities/Auth";
import authService from "../services/authService";

const useLoginUser = () =>
  useMutation<Auth, AxiosError, UserLoginData>({
    mutationFn: authService.add,
  });

export default useLoginUser;
