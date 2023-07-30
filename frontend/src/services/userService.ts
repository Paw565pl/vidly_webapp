import User, { UserRegisterData } from "../entities/User";
import ApiClient from "./apiClient";

const userService = new ApiClient<User, UserRegisterData>("/users");

export default userService;
