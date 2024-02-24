import { z } from "zod";
import { loginSchema } from "../schemas/UserSchema";

type AuthToken = string;

export type UserLoginData = z.infer<typeof loginSchema>;

export default AuthToken;
