import { useEffect } from 'react'
import { useRouteStore } from '@/stores/route'
import { useUserStore } from '@/stores/user'

/**
 * 动态路由初始化 Hook
 * 用于在用户登录后或页面刷新时初始化动态路由
 */
export const useRouteInitializer = () => {
  const { isLoggedIn } = useUserStore()
  const { initializeRoutes, initialized, loading } = useRouteStore()

  useEffect(() => {
    // 只有在用户已登录且路由未初始化时才进行初始化
    if (isLoggedIn && !initialized && !loading) {
      initializeRoutes()
    }
  }, [isLoggedIn, initialized, loading, initializeRoutes])

  return { loading, initialized }
}
