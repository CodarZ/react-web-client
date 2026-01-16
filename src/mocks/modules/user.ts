import { delay, http, HttpResponse } from 'msw';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const userHandlers = [
  /** 根据 ID 获取用户信息 */
  http.get(`${BASE_URL}/user/:id`, async ({ params }) => {
    await delay(500);

    return HttpResponse.json({
      code: 0,
      msg: '请求成功',
      data: {
        id: params.id,
        name: 'test',
      },
    });
  }),

  /** 更新用户信息 */
  http.post(`${BASE_URL}/user/update`, async ({ request }) => {
    const body: any = await request.json();

    await delay(800);

    return HttpResponse.json({
      code: 0,
      msg: '用户信息更新成功！',
      data: {
        id: body.id || 'unknown',
        name: body.name || 'new user',
        updatedAt: new Date().toISOString(),
      },
    });
  }),
];
