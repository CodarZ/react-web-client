import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiResponse, PaginatedData } from '@/apis/request';
import { request } from '@/apis/request';

import type { LoginRequest, LoginResponse, User, UserListParams } from './schema';
import { LoginResponseSchema, UserSchema } from './schema';

// ============================================================
// Query Keys
// ============================================================

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// ============================================================
// API Functions
// ============================================================

/**
 * 获取用户列表
 */
export const fetchUserList = async (params: UserListParams): Promise<ApiResponse<PaginatedData<User>>> => {
  const response = await request.get<ApiResponse<PaginatedData<User>>>('/users', { params });
  // TODO: 可选择在此处使用 Zod 验证响应数据
  return response.data;
};

/**
 * 获取用户详情
 */
export const fetchUserDetail = async (id: number): Promise<ApiResponse<User>> => {
  const response = await request.get<ApiResponse<User>>(`/users/${id}`);

  // 使用 Zod 验证响应数据
  const parseResult = UserSchema.safeParse(response.data.data);
  if (!parseResult.success) {
    console.warn('[Zod Validation Warning]', parseResult.error);
  }

  return response.data;
};

/**
 * 用户登录
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', data);

  // 使用 Zod 验证响应数据
  const parseResult = LoginResponseSchema.safeParse(response.data.data);
  if (!parseResult.success) {
    console.warn('[Zod Validation Warning]', parseResult.error);
  }

  return response.data;
};

/**
 * 用户登出
 */
export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await request.post<ApiResponse<null>>('/auth/logout');
  return response.data;
};

// ============================================================
// React Query Hooks
// ============================================================

/**
 * 用户列表 Query Hook
 */
export const useUserList = (params: UserListParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUserList(params),
    staleTime: 5 * 60 * 1000, // 5 分钟
  });
};

/**
 * 用户详情 Query Hook
 */
export const useUserDetail = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUserDetail(id),
    enabled: id > 0,
  });
};

/**
 * 登录 Mutation Hook
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // 登录成功后，保存 token
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      // 使用户相关缓存失效
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

/**
 * 登出 Mutation Hook
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 清除 token
      localStorage.removeItem('token');
      // 清除所有用户相关缓存
      queryClient.removeQueries({ queryKey: userKeys.all });
    },
  });
};
