import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User, { UserRegisterData } from "../entities/User";
import userService from "../services/userService";

const useRegisterUser = () =>
  useMutation<User, AxiosError, UserRegisterData>({
    mutationFn: userService.add,
  });

export default useRegisterUser;
