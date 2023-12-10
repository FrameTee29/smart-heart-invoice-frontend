import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

const url = process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL || "";

const httpClient = (baseURL: string = url) => {
  const http = axios.create({
    baseURL,
  });

  http.interceptors.request.use(async (config: any) => {
    const accessToken = '';
    if (accessToken) {
      (config.headers as AxiosRequestHeaders).authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 400) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  return http;
};

export default httpClient;
