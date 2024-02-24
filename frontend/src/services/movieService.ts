import Movie from "../entities/Movie";
import { MovieFormValues } from "../schemas/MovieSchema";
import ApiClient from "./apiClient";

const movieService = new ApiClient<Movie, MovieFormValues>("/movies");

export default movieService;
