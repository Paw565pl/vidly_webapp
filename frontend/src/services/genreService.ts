import Genre from "../entities/Genre";
import ApiClient from "./apiClient";

const genreService = new ApiClient<Genre>("/genres");

export default genreService;
