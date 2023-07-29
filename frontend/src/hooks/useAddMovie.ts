import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie from "../entities/Movie";
import movieService from "../services/movieService";

const useAddMovie = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  return useMutation<Movie, AxiosError, Movie, Movie[]>({
    mutationFn: movieService.add,

    onMutate: async (newMovie: Movie) => {
      await queryClient.cancelQueries({ queryKey });

      const previousMovies = queryClient.getQueryData<Movie[]>(queryKey) || [];

      queryClient.setQueryData<Movie[]>(queryKey, (oldMovies = []) => [
        ...oldMovies,
        newMovie,
      ]);

      return previousMovies;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },

    onError: (error, newMovie, previousMovies) => {
      if (!previousMovies) return;

      queryClient.setQueryData<Movie[]>(queryKey, previousMovies);
    },
  });
};

export default useAddMovie;
