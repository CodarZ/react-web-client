import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import Layout from '@/layouts/base/index'
import Home from '@/views/home'
import Login from '@/views/login'
import Error403 from '@/views/error/403'
import Error404 from '@/views/error/404'
import { convertToRouteObject } from '@/utils'
import { getSystemRoutes } from '@/apis/static/system'

// 动态路由数据
let dynamicRoutes: RouteObject[] = []

// 获取动态路由并转换为 RouteObject
export async function loadDynamicRoutes() {
  try {
    const routeData = await getSystemRoutes()
    dynamicRoutes = routeData.map(convertToRouteObject)
    return dynamicRoutes
  } catch (error) {
    console.error('Failed to load dynamic routes:', error)
    return []
  }
}

const baseRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/redirect',
  },
]

const mainRoute: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: '/error',
      children: [
        {
          index: true,
          element: <Navigate to="/error/404" replace />,
        },
        {
          path: '404',
          element: <Error404 />,
        },
        {
          path: '403',
          element: <Error403 />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/error/404" replace />,
    },
  ],
}

// 获取包含动态路由的完整路由配置
async function getMainRouteWithDynamicRoutes(): Promise<RouteObject> {
  const dynamicRoutes = await loadDynamicRoutes()

  return {
    ...mainRoute,
    children: [...(mainRoute.children || []), ...dynamicRoutes],
  } as RouteObject
}

// 获取动态路由数据用于菜单渲染
async function getDynamicMenuData() {
  try {
    const routeData = await getSystemRoutes()
    return routeData
  } catch (error) {
    console.error('Failed to load dynamic menu data:', error)
    return []
  }
}

export { baseRoutes, mainRoute, getMainRouteWithDynamicRoutes, getDynamicMenuData }
