import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LoginResponse } from '@/mocks/modules/auth/types';
import type { User } from '@/mocks/modules/user/schema';
import { Route as LoginRoute } from '@/routes/(auth)/login';
import { router } from '@/routes/-index';

export interface UserState {
  /** 认证 Token */
  token: string | null;
  /** 用户信息 */
  userInfo: User | null;
}

export interface UserActions {
  /** 设置 Token */
  setToken: (token: string) => void;
  /** 设置用户信息 */
  setUserInfo: (userInfo: User) => void;
  /** 登录（原子更新） */
  login: (payload: LoginResponse) => void;
  /** 退出登录（清除所有认证状态） */
  logout: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,

      setToken: (token) => set({ token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      login: (payload) => set({ token: payload.token, userInfo: payload.userInfo }),
      logout: () => {
        set({ token: null, userInfo: null });
        // 自动跳转到登录页
        if (window.location.pathname !== LoginRoute.to) {
          router.navigate({ to: LoginRoute.to, replace: true });
        }
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
      }),
    },
  ),
);
