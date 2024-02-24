import User from "../entities/User";
import { UserRegisterFormValues } from "../schemas/UserSchema";
import ApiClient from "./apiClient";

const userService = new ApiClient<User, UserRegisterFormValues>("/users");

export default userService;
