import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'
import { useRouteStore } from '@/stores/route'

// 应用启动时的认证检查 Hook
export const useAuthCheck = () => {
  const { isLoggedIn } = useUserStore()
  const { initializeRoutes, initialized } = useRouteStore()

  useEffect(() => {
    // 页面刷新时，如果用户已登录但路由未初始化，重新初始化路由
    if (isLoggedIn && !initialized) {
      initializeRoutes()
    }
  }, [isLoggedIn, initialized, initializeRoutes])
}
