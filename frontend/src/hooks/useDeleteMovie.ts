import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie from "../entities/Movie";
import movieService from "../services/movieService";

const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  return useMutation<Movie, AxiosError, string, Movie[]>({
    mutationFn: movieService.remove,

    onMutate: async (deletedMovieId: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previousMovies = queryClient.getQueryData<Movie[]>(queryKey) || [];

      queryClient.setQueryData<Movie[]>(queryKey, (oldMovies) =>
        oldMovies?.filter((movie) => movie._id !== deletedMovieId)
      );

      return previousMovies;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },

    onError: (error, deletedMovieId, previousMovies) => {
      if (!previousMovies) return;

      queryClient.setQueryData<Movie[]>(queryKey, previousMovies);
    },
  });
};

export default useDeleteMovie;
