import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie from "../entities/Movie";
import { MovieFormValues } from "../schemas/MovieSchema";
import movieService from "../services/movieService";

const useAddMovie = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  return useMutation<Movie, AxiosError, MovieFormValues, Movie[]>({
    mutationFn: movieService.add,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),

    retry: false,
  });
};

export default useAddMovie;
