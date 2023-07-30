import User, { UserForm } from "../entities/User";
import ApiClient from "./apiClient";

const userService = new ApiClient<User, UserForm>("/users");

export default userService;
