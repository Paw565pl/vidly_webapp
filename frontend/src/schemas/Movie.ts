import { z } from "zod";

const User = z.object({
  titlle: z.string().nonempty("this field is required"),
  genre: z.string().nonempty("this field is required"),
  numberInStock: z
    .number()
    .min(0, "must be greater than 0")
    .max(100, "must be less than 100"),
  rate: z
    .number()
    .min(0, "must be greater than 0")
    .max(10, "must be greater than 10"),
});

export default User;
