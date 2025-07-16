import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useRouteStore } from '@/stores/route'
import { useUserStore } from '@/stores/user'

/**
 * 页面刷新时的路由恢复 Hook
 * 确保在动态路由重新加载后，用户能够停留在当前页面
 */
export const useRouteRecovery = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn } = useUserStore()
  const { initialized, systemRoutes, rebuildFromCache } = useRouteStore()

  useEffect(() => {
    // 页面刷新时的处理逻辑
    const handlePageRefresh = () => {
      if (isLoggedIn && systemRoutes.length > 0 && !initialized) {
        // 从缓存重建路由
        rebuildFromCache()

        // 保持当前路径
        const currentPath = location.pathname
        if (currentPath !== '/') {
          // 延迟导航，确保路由已经重建
          setTimeout(() => {
            navigate(currentPath, { replace: true })
          }, 100)
        }
      }
    }

    handlePageRefresh()
  }, [isLoggedIn, systemRoutes.length, initialized, location.pathname, navigate, rebuildFromCache])

  return { initialized }
}
