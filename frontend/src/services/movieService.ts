import Movie, { MovieForm } from "../entities/Movie";
import ApiClient from "./apiClient";

const movieService = new ApiClient<Movie, MovieForm>("/movies");

export default movieService;
