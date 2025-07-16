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

      setToken: (token) => set({ token, isLoggedIn: !!token }),

      setUserInfo: (userInfo) => set({ userInfo, isLoggedIn: true }),

      clearUser: () => {
        // 清除用户信息时，同时清除动态路由
        set({ userInfo: null, token: null, isLoggedIn: false })

        // 延迟清除路由，确保用户状态先更新
        setTimeout(async () => {
          const { useRouteStore } = await import('@/stores/route')
          useRouteStore.getState().clearRoutes()
        }, 0)
      },
    }),
    {
      name: 'user',
    },
  ),
)
