import axios, { AxiosRequestConfig } from "axios";
import { getUserJwt } from "../contexts/AuthContextProvider";

interface updateQuery<T, P = void> {
  itemId: string;
  item: T | P;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getUserJwt();

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
});

class ApiClient<T, P = void> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance.get<T[]>(this.endpoint, config).then(({ data }) => data);

  add = (item: T | P) =>
    axiosInstance.post<T>(this.endpoint, item).then(({ data }) => data);

  update = ({ itemId, item }: updateQuery<T, P>) =>
    axiosInstance
      .put<T>(this.endpoint + "/" + itemId, item)
      .then(({ data }) => data);

  remove = (itemId: string) =>
    axiosInstance
      .delete<T>(this.endpoint + "/" + itemId)
      .then(({ data }) => data);
}

export default ApiClient;
