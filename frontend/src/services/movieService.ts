import Movie from "../entities/Movie";
import ApiClient from "./apiClient";

const movieService = new ApiClient<Movie>("/movies");

export default movieService;
