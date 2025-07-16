import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import Layout from '@/layouts/base/index'
import Home from '@/views/home'
import Login from '@/views/login'
import Error403 from '@/views/error/403'
import Error404 from '@/views/error/404'
import RouteTest from '@/views/test/route'

export const baseRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/redirect',
  },
]

// 创建主路由的函数，支持动态路由注入
export const createMainRoute = (dynamicRoutes: RouteObject[] = []): RouteObject => ({
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    // 添加测试路由
    {
      path: '/test/route',
      element: <RouteTest />,
    },
    // 注入动态路由
    ...dynamicRoutes,
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
})

// 默认主路由（不包含动态路由）
export const mainRoute: RouteObject = createMainRoute()
