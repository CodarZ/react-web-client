import { Navigate } from 'react-router'
import Layout from '@/layouts/base/index'
import Home from '@/views/home'
import Login from '@/views/login'
import Error403 from '@/views/error/403'
import Error404 from '@/views/error/404'
import Error500 from '@/views/error/500'

import type { RouteObject } from 'react-router'

/**
 * 基础路由, 渲染组件页面
 */
export const baseRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/redirect',
  },
]

export function createMainRoutes(dynamicRoutes: RouteObject[] = []): RouteObject {
  return {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
          {
            path: '500',
            element: <Error500 />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/error/404" replace />,
      },
    ],
  }
}
