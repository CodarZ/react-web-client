import { z } from 'zod';

import { ISODateTimeStringSchema, OptionalISODateTimeStringSchema } from '../../shared/datetime';

// ============================================================
// 用户相关 Schema 定义
// ============================================================

/**
 * 用户角色枚举
 */
export const UserRoleSchema = z.enum(['admin', 'user', 'guest']);

export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * 用户基础信息 Schema（原始类型，用于 Mock 和 API 响应验证）
 *
 * 日期字段保持为 ISO 字符串格式
 */
export const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  avatar: z.string().url().optional().nullable(),
  role: UserRoleSchema,
  createdAt: ISODateTimeStringSchema,
  updatedAt: OptionalISODateTimeStringSchema,
});

export type User = z.infer<typeof UserSchema>;

/**
 * 用户登录请求 Schema
 */
export const LoginRequestSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码至少 6 位'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

/**
 * 用户登录响应 Schema
 */
export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
  expiresAt: ISODateTimeStringSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

/**
 * 用户列表查询参数 Schema
 */
export const UserListParamsSchema = z.object({
  pageNum: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  keyword: z.string().optional(),
  role: UserRoleSchema.optional(),
});

export type UserListParams = z.infer<typeof UserListParamsSchema>;

/**
 * 用户信息更新 Schema
 */
export const UpdateUserSchema = z.object({
  username: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional().nullable(),
  role: UserRoleSchema.optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
