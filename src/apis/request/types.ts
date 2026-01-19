/** biome-ignore-all lint/suspicious/noExplicitAny: 类型文件 */

/** 响应结构体 */
export interface APIResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

/** 空数据响应 */
export type EmptyResponse = APIResponse<null>;

/** 分页请求参数(必有的) */
export interface PaginationParams {
  /** 页码：从 1 开始 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

/** 分页响应数据 */
export interface PaginatedData<T = any> {
  /** 总数 */
  total: number;
  /** 数据 */
  rows: T[];
  /** 页码：从 1 开始 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

/** 分页响应体 */
export type PaginatedResponse<T> = APIResponse<PaginatedData<T>>;
