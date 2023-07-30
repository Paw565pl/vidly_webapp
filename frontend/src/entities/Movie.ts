import { z } from "zod";
import MovieSchema from "../schemas/MovieSchema";
import Genre from "./Genre";

export default interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
}

export type MovieForm = z.infer<typeof MovieSchema>;
