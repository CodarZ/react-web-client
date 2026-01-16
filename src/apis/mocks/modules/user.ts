import { delay, http, HttpResponse } from 'msw';

import {
  createMockLoginResponse,
  createMockUser,
  createMockUserList,
  MOCK_USERS,
} from '@/apis/contracts/modules/user/data';

import { createApiResponse, createErrorResponse, createPaginatedData, randomDelay } from '../utils/faker';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * 用户模块 Mock Handlers
 */
export const userHandlers = [
  /**
   * 用户登录
   */
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(randomDelay(200, 500));

    const body = (await request.json()) as {
      username: string;
      password: string;
    };

    // 模拟登录验证
    if (body.username === 'admin' && body.password === '123456') {
      return HttpResponse.json(
        createApiResponse(
          createMockLoginResponse({
            user: MOCK_USERS.admin,
          }),
        ),
      );
    }

    if (body.username === 'user' && body.password === '123456') {
      return HttpResponse.json(
        createApiResponse(
          createMockLoginResponse({
            user: MOCK_USERS.user,
          }),
        ),
      );
    }

    // 模拟登录失败
    return HttpResponse.json(createErrorResponse(401, '用户名或密码错误'), {
      status: 401,
    });
  }),

  /**
   * 用户登出
   */
  http.post(`${BASE_URL}/auth/logout`, async () => {
    await delay(randomDelay(100, 200));
    return HttpResponse.json(createApiResponse(null, true, '登出成功'));
  }),

  /**
   * 获取用户列表
   */
  http.get(`${BASE_URL}/users`, async ({ request }) => {
    await delay(randomDelay(100, 300));

    const url = new URL(request.url);
    const pageNum = Number(url.searchParams.get('pageNum')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const keyword = url.searchParams.get('keyword');
    const role = url.searchParams.get('role');

    // 生成 Mock 数据
    let users = createMockUserList(50);

    // 模拟关键词过滤
    if (keyword) {
      users = users.filter((u) => u.username.includes(keyword) || u.email.includes(keyword));
    }

    // 模拟角色过滤
    if (role) {
      users = users.filter((u) => u.role === role);
    }

    const paginatedData = createPaginatedData(users, pageNum, pageSize, users.length);
    return HttpResponse.json(createApiResponse(paginatedData));
  }),

  /**
   * 获取用户详情
   */
  http.get(`${BASE_URL}/users/:id`, async ({ params }) => {
    await delay(randomDelay(100, 200));

    const { id } = params;
    const user = createMockUser({ id: Number(id) });

    return HttpResponse.json(createApiResponse(user));
  }),

  /**
   * 更新用户信息
   */
  http.put(`${BASE_URL}/users/:id`, async ({ params, request }) => {
    await delay(randomDelay(200, 400));

    const { id } = params;
    const body = await request.json();

    const updatedUser = createMockUser({
      id: Number(id),
      ...(body as object),
    });

    return HttpResponse.json(createApiResponse(updatedUser));
  }),

  /**
   * 删除用户
   */
  http.delete(`${BASE_URL}/users/:id`, async () => {
    await delay(randomDelay(100, 200));
    return HttpResponse.json(createApiResponse(null, true, '删除成功'));
  }),
];
