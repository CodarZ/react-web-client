import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

/**
 * 默认配置
 */
const defaultConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * 创建 Axios 实例
 */
export const createAxiosInstance = (config?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({
    ...defaultConfig,
    ...config,
  });
};

/**
 * 默认 Axios 实例
 */
export const axiosInstance = createAxiosInstance();
