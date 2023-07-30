import { z } from "zod";

const UserSchema = z.object({
  name: z
    .string()
    .nonempty("this field is required")
    .min(2, "name must be at least 2 characters")
    .max(50, "name can't be longer than 50 characters"),
  email: z
    .string()
    .nonempty("this field is required")
    .email("this is not valid email address")
    .min(5, "email must be at least 5 characters")
    .max(255, "email can't be longer than 255 characters"),
  password: z
    .string()
    .nonempty("this field is required")
    .min(5, "password must be at least 5 characters")
    .max(255, "password can't be longer than 255 characters"),
});

export default UserSchema;
