import { delay, http, HttpResponse } from 'msw';

import { fakeToken, fakeUserInfo } from './data';
import { LoginSchema } from './schema';

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || '';

export const authHandlers = [
  /** 获取验证码 */
  http.get(`${BASE_URL}/auth/captcha`, async () => {
    await delay();
    return HttpResponse.json({
      code: 200,
      msg: '请求成功',
      data: '验证码图片',
    });
  }),

  /** 登录 */
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const bodyResult = LoginSchema.safeParse(await request.json());

    if (!bodyResult.success) {
      return HttpResponse.json({
        code: 400,
        msg: '请求参数错误',
        data: null,
      });
    }

    const { username } = bodyResult.data;

    await delay(800);

    return HttpResponse.json({
      code: 200,
      msg: '登录成功',
      data: {
        token: fakeToken(),
        userInfo: fakeUserInfo(username),
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
