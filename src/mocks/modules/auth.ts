import { delay, http, HttpResponse } from 'msw';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const authHandlers = [
  /** 获取验证码 */
  http.get(`${BASE_URL}/auth/captcha`, async () => {
    await delay();
    return HttpResponse.json({
      code: 200,
      msg: '请求成功',
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    });
  }),

  /** 登录 */
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const body: any = await request.json();

    await delay(800);

    return HttpResponse.json({
      code: 200,
      msg: '登录成功',
      data: {
        token: `mock-token-${Date.now()}`,
        userInfo: {
          id: 1,
          username: body.username,
          nickname: 'Admin',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          roles: ['admin'],
          permissions: ['*'],
        },
      },
    });
  }),

  /** 退出登录 */
  http.post(`${BASE_URL}/auth/logout`, async () => {
    await delay(500);
    return HttpResponse.json({
      code: 200,
      msg: '登出成功',
      data: null,
    });
  }),
];
