import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User, { UserForm } from "../entities/User";
import userService from "../services/userService";

const useRegisterUser = () =>
  useMutation<User, AxiosError, UserForm>({
    mutationFn: userService.add,
  });

export default useRegisterUser;
