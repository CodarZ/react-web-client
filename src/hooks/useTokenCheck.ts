import { useEffect, useCallback } from 'react'
import { useUserStore, useRouteStore } from '@/stores'

/**
 * Token 检测 Hook
 * 用于在组件中检测token状态
 */
export function useTokenCheck() {
  const { token, isLoggedIn, clearUser } = useUserStore()
  const { clearRoutes } = useRouteStore()

  const checkAndClearToken = useCallback(() => {
    if (!token || token.trim() === '') {
      clearUser()
      clearRoutes()

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
      return false
    }
    return true
  }, [token, clearUser, clearRoutes])

  useEffect(() => {
    checkAndClearToken()
  }, [checkAndClearToken])

  return {
    token,
    isLoggedIn,
    isTokenValid: !!token && token.trim() !== '',
    checkAndClearToken,
  }
}
