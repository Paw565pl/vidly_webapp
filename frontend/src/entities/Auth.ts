import { z } from "zod";
import UserSchema from "../schemas/UserSchema";

export default interface Auth {
  jsonWebToken: string;
}

export const loginSchema = UserSchema.pick({ name: true, password: true });

export type UserLoginData = z.infer<typeof loginSchema>;
