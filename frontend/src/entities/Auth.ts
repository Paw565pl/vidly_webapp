import { z } from "zod";
import { loginSchema } from "../schemas/UserSchema";

type Auth = string;

export type UserLoginData = z.infer<typeof loginSchema>;
export default Auth;
