import { z } from "zod";

const UserSchema = z.object({
  name: z
    .string({
      required_error: "this field is required",
    })
    .trim()
    .min(2, "name must be at least 2 characters")
    .max(50, "name can't be longer than 50 characters"),
  email: z
    .string({
      required_error: "this field is required",
    })
    .trim()
    .min(5, "email must be at least 5 characters")
    .max(255, "email can't be longer than 255 characters")
    .email("this is not valid email address"),
  password: z
    .string({
      required_error: "this field is required",
    })
    .trim()
    .min(5, "password must be at least 5 characters")
    .max(255, "password can't be longer than 255 characters"),
});

export type UserRegisterFormValues = z.infer<typeof UserSchema>;

export const loginSchema = UserSchema.pick({ email: true, password: true });
export type UserLoginFormValues = z.infer<typeof loginSchema>;

export default UserSchema;
