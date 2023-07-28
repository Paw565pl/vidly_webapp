import { useQuery } from "@tanstack/react-query";
import Movie from "../entities/Movie";
import movieService from "../services/movieService";

const useMovies = () =>
  useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: movieService.getAll,
  });

export default useMovies;
