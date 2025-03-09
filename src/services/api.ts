import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './user-data';
import { ErrorResponse, ErrorResponseDetailed } from '../types/error-response';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse | ErrorResponseDetailed>) => {
      if (error.response && StatusCodeMapping[error.response.status]) {
        toast.warn(error.response.data.message);
      }
      throw error;
    }
  );

  return api;
}
