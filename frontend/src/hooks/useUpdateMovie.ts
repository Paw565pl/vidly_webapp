import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie, { MovieForm } from "../entities/Movie";
import movieService from "../services/movieService";

interface QueryParams {
  itemId: string;
  item: MovieForm;
}

const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  return useMutation<Movie, AxiosError, QueryParams, Movie[]>({
    mutationFn: movieService.update,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),

    retry: false,
  });
};

export default useUpdateMovie;
