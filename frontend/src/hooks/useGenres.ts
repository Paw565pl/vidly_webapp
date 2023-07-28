import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
  });

export default useGenres;
