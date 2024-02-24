import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Movie from "../entities/Movie";
import { MovieFormValues } from "../schemas/MovieSchema";
import movieService from "../services/movieService";

interface QueryParams {
  itemId: string;
  item: MovieFormValues;
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
