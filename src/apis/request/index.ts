import { axiosInstance } from './instance';
import { applyInterceptors } from './interceptors';

// 应用拦截器
applyInterceptors(axiosInstance);

/**
 * 导出配置好的 Axios 实例
 */
export const request = axiosInstance;

/**
 * 导出创建实例的方法和 mutator（供 Orval 使用）
 */
export { createAxiosInstance } from './instance';
export { customInstance } from './mutator';
export type { BodyType, ErrorType } from './mutator';

/**
 * 导出类型定义
 */
export type {
  ApiResponse,
  EmptyResponse,
  ExtendedAxiosRequestConfig,
  PaginatedData,
  PaginatedResponse,
  PaginationParams,
} from './types';
