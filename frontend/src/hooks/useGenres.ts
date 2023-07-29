import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Genre from "../entities/Genre";
import genreService from "../services/genreService";

const useGenres = () =>
  useQuery<Genre[], AxiosError>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
  });

export default useGenres;
