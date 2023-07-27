import { z } from "zod";

const UserSchema = z.object({
  username: z.string().nonempty("this field is required"),
  email: z
    .string()
    .nonempty("this field is required")
    .email("this field is not valid email address"),
  password: z
    .string()
    .nonempty("this field is required")
    .min(8, "password must be at least 8 characters"),
});

export default UserSchema;
