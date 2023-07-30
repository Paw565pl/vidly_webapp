import Auth, { UserLoginData } from "../entities/Auth";
import ApiClient from "./apiClient";

const authService = new ApiClient<Auth, UserLoginData>("/auth");

export default authService;
