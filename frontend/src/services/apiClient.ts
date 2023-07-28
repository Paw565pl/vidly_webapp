import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3900/api",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<T[]>(this.endpoint, config)
      .then(({ data }) => data)
      .catch((err) => err);

  remove = (itemId: T) => axiosInstance.delete(this.endpoint + "/" + itemId);
}

export default ApiClient;
