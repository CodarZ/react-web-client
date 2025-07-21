import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户信息接口
interface UserInfo {
  id: string
  nickname: string
  username: string
  avatar?: string
  roles?: string[]
}

export const useUserStore = create()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      isLoggedIn: false,

      setToken: (token: string) => set({ token, isLoggedIn: !!token }),

      setUserInfo: (userInfo: UserInfo) => set({ userInfo, isLoggedIn: true }),

      clearUser: () => {
        // 清除用户信息时，同时清除动态路由
        set({ userInfo: null, token: null, isLoggedIn: false })
      },
    }),
    {
      name: 'user',
    },
  ),
)
