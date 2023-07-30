import AuthToken, { UserLoginData } from "../entities/Auth";
import ApiClient from "./apiClient";

const authService = new ApiClient<AuthToken, UserLoginData>("/auth");

export default authService;
