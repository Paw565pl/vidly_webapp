import { useQuery } from "@tanstack/react-query";
import Movie from "../entities/Movie";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Movie>("/movies");

const useMovies = () =>
  useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: apiClient.getAll,
  });

export default useMovies;
