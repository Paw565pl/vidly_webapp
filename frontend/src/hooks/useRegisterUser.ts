import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User from "../entities/User";
import { UserRegisterFormValues } from "../schemas/UserSchema";
import userService from "../services/userService";

const useRegisterUser = () =>
  useMutation<User, AxiosError, UserRegisterFormValues>({
    mutationFn: userService.add,
  });

export default useRegisterUser;
