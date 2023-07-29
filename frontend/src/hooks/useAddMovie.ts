import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie, { MovieForm } from "../entities/Movie";
import movieService from "../services/movieService";

const useAddMovie = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  return useMutation<Movie, AxiosError, MovieForm, Movie[]>({
    mutationFn: movieService.add,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  });
};

export default useAddMovie;
