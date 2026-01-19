import axios from 'axios';

import {
  requestErrorInterceptor,
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from './interceptor';

export const baseAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICE_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseAxiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
baseAxiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
