import { useQuery } from '@tanstack/react-query';

import type { User } from '@/mocks/modules/user/schema';

import { request, type APIResponse } from '../request';

export const userKeys = {
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
};

/** 获取用户列表 */
async function fetchUserList(signal?: AbortSignal): Promise<User[]> {
  const response = await request.get<APIResponse<User[]>>('/user/list', { signal });
  return response.data.data;
}

/** 获取单个用户 */
async function fetchUser(id: string, signal?: AbortSignal): Promise<User> {
  const response = await request.get<APIResponse<User>>(`/user/${id}`, { signal });
  return response.data.data;
}

/** 用户列表 Hook */
export function useUserList({ enabled = true } = {}) {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: ({ signal }) => fetchUserList(signal),
    enabled,
  });
}

/** 单个用户 Hook */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: ({ signal }) => fetchUser(id, signal),
    enabled: !!id,
  });
}
