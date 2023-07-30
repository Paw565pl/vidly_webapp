import { z } from "zod";
import UserSchema from "../schemas/UserSchema";

export default interface Auth {
  jsonWebToken: string;
}

export const loginSchema = UserSchema.pick({ email: true, password: true });

export type UserLoginData = z.infer<typeof loginSchema>;
