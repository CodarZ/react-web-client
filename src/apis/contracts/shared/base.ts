import { z } from 'zod';

/**
 * 通用 API 响应结构 Schema
 *
 * 根据后端实际响应格式定义，与 types.ts 中的 ApiResponse 保持一致
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number(),
    msg: z.string(),
    data: dataSchema,
  });

/**
 * 空数据响应
 */
export const EmptyResponseSchema = ApiResponseSchema(z.null());

/**
 * 分页数据 Schema
 */
export const PaginatedDataSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    total: z.number().int().min(0),
    rows: z.array(itemSchema),
    pageSize: z.number().int().min(1),
    pageNum: z.number().int().min(1),
  });

/**
 * 分页响应 Schema
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  ApiResponseSchema(PaginatedDataSchema(itemSchema));

/**
 * 分页请求参数 Schema
 */
export const PaginationParamsSchema = z.object({
  pageNum: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export type PaginationParamsZod = z.infer<typeof PaginationParamsSchema>;
