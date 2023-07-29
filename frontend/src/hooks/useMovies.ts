import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie from "../entities/Movie";
import movieService from "../services/movieService";

const useMovies = () =>
  useQuery<Movie[], AxiosError>({
    queryKey: ["movies"],
    queryFn: movieService.getAll,
  });

export default useMovies;
