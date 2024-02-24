import { UserLoginFormValues } from "../schemas/UserSchema";
import ApiClient from "./apiClient";

const authService = new ApiClient<string, UserLoginFormValues>("/auth");

export default authService;
