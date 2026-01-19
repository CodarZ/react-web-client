import { useMutation } from '@tanstack/react-query';

import type { LoginParams, LoginResponse } from '@/mocks/modules/auth';

import { request, type APIResponse } from '../request';

/** 登录 */
async function loginApi(data: LoginParams): Promise<LoginResponse> {
  const response = await request.post<APIResponse<LoginResponse>>('/auth/login', data);
  return response.data.data;
}

/** 退出登录 */
async function logoutApi(): Promise<void> {
  await request.post('/auth/logout');
}

/** 登录 Hook */
export function useLogin() {
  return useMutation({ mutationFn: loginApi });
}

/** 退出登录 Hook */
export function useLogout() {
  return useMutation({ mutationFn: logoutApi });
}
