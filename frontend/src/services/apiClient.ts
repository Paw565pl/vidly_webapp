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
    axiosInstance.get<T[]>(this.endpoint, config).then(({ data }) => data);

  remove = (itemId: string | number) =>
    axiosInstance
      .delete<T>(this.endpoint + "/" + itemId)
      .then(({ data }) => data);
}

export default ApiClient;
