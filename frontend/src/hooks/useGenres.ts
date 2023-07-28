import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import genreService from "../services/genreService";

const useGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
  });

export default useGenres;
