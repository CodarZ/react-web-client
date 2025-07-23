import { Navigate } from 'react-router'
import { useUserStore } from '@/stores'

interface RouterGuardProps {
  children: React.ReactNode
}

/**
 * 受保护的路由组件
 * 检查用户是否已登录，如果未登录则重定向到登录页
 */
export default function RouterGuard({ children }: RouterGuardProps) {
  const { token } = useUserStore()

  // 如果没有token或token为空，直接重定向到登录页
  if (!token || token.trim() === '') {
    return <Navigate to="/login" replace />
  }

  // 如果有token，渲染子组件
  return <>{children}</>
}
