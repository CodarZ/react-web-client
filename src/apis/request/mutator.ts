import type { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './instance';

/**
 * Orval Mutator - 自定义 HTTP 客户端
 *
 * 此函数作为 mutator 配置，让 Orval 生成的代码使用封装的 axios 实例
 *
 * @see https://orval.dev/reference/configuration/output#mutator
 */
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const controller = new AbortController();

  const promise = axiosInstance<T>({
    ...config,
    ...options,
    signal: controller.signal,
  }).then(({ data }) => data);

  // 支持取消请求（在 React Query 中使用）
  (promise as Promise<T> & { cancel: () => void }).cancel = () => {
    controller.abort();
  };

  return promise;
};

export default customInstance;

/**
 * 导出请求体类型（Orval 需要）
 */
export type BodyType<T> = T;

/**
 * 导出错误类型（Orval 需要）
 */
export type ErrorType<T = unknown> = T;
