import { createBrowserRouter } from 'react-router'
import { baseRoutes, mainRoute, createMainRoute } from './constants'
import { useRouteStore } from '@/stores/route'

// 创建路由器的函数
export const createRouter = () => {
  const { dynamicRoutes } = useRouteStore.getState()

  // 如果有动态路由，使用带动态路由的主路由
  const finalMainRoute = dynamicRoutes.length > 0 ? createMainRoute(dynamicRoutes) : mainRoute

  return createBrowserRouter([...baseRoutes, finalMainRoute])
}

// 默认路由器
const router = createRouter()

export default router
