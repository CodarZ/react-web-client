import { clearToken, setToken } from '@/utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户状态接口
interface UserState {
  userInfo: UserInfo | null
  token: string | null
  isLoggedIn: boolean
  // 操作方法
  setToken: (token: string) => void
  setUserInfo: (userInfo: UserInfo) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      isLoggedIn: false,

      setToken: (token) => {
        setToken(token)
        set({ token, isLoggedIn: !!token })
      },

      setUserInfo: (userInfo) => set({ userInfo, isLoggedIn: true }),

      clearUser: () => {
        // 清除用户信息时，同时清除动态路由
        set({ userInfo: null, token: null, isLoggedIn: false })
        clearToken()
      },
    }),
    {
      name: 'user',
    },
  ),
)
