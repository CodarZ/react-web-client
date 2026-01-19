import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import { baseAxiosInstance } from './instance';

/**
 * 可取消的 Promise 类型
 * TanStack Query 会检测 cancel 方法来取消请求
 */
export type CancellablePromise<T> = Promise<T> & {
  cancel: () => void;
};

/**
 * Orval Mutator
 * 此函数作为 mutator 配置，让 Orval 生成的代码使用封装的 axios 实例
 *
 * @see https://orval.dev/reference/configuration/output#mutator
 */
export function orvalMutator<T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): CancellablePromise<T> {
  const controller = new AbortController();

  const promise = baseAxiosInstance<T, AxiosResponse<T>>({
    ...config,
    ...options,
    signal: options?.signal ?? config.signal ?? controller.signal,
  }).then((response) => response.data) as CancellablePromise<T>;

  promise.cancel = () => {
    controller.abort('请求取消');
  };

  return promise;
}
