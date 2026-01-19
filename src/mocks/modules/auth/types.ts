import type { User } from '../user/schema';

/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
}

/** 登录响应数据 */
export interface LoginResponse {
  token: string;
  userInfo: User;
}
