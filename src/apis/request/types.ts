import type { AxiosRequestConfig } from 'axios';

/** API 响应结构 */
// biome-ignore lint/suspicious/noExplicitAny: 允许
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

/** 空数据响应 */
export type EmptyResponse = ApiResponse<null>;

/** 分页请求参数 */
export interface PaginationParams {
  /** 页码：从 1 开始 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

/** 分页响应数据内容 */
// biome-ignore lint/suspicious/noExplicitAny: 允许
export interface PaginatedData<T = any> {
  total: number;
  rows: T[];
  pageSize: number;
  pageNum: number;
}

/** 分页响应体 */
export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;

/** 扩展的 Axios 请求配置 */
export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  /** 是否跳过 Mock（即使全局开启 Mock，也使用真实 API） */
  skipMock?: boolean;
  /** 是否跳过错误提示 */
  skipErrorMessage?: boolean;
  /** 是否跳过 Token 注入 */
  skipAuth?: boolean;
  /** 重试次数 */
  retryCount?: number;
}
