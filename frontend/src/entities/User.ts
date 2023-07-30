import { z } from "zod";
import UserSchema from "../schemas/UserSchema";

export default interface User {
  _id: string;
  name: string;
  email: string;
}

export type UserRegisterData = z.infer<typeof UserSchema>;
