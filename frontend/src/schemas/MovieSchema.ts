import { z } from "zod";

const MovieSchema = z.object({
  title: z
    .string()
    .nonempty("this field is required")
    .min(5, "minimum length is 5 characters")
    .max(50, "maximum length is 50 characters"),
  genreId: z.string().nonempty("this field is required"),
  numberInStock: z
    .number({ invalid_type_error: "this field is required" })
    .min(0, "must be greater than 0")
    .max(100, "must be less than 100"),
  dailyRentalRate: z
    .number({ invalid_type_error: "this field is required" })
    .min(0, "must be greater than 0")
    .max(10, "must be less than 10"),
});

export default MovieSchema;
