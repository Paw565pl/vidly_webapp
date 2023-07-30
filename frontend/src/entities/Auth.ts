import { z } from "zod";
import { loginSchema } from "../schemas/UserSchema";

export default interface Auth {
  jsonWebToken: string;
}

export type UserLoginData = z.infer<typeof loginSchema>;
