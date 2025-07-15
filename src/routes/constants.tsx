import Layout from '@/layouts/base/index'
import Home from '@/views/home'
import Login from '@/views/login'
import Error403 from '@/views/error/403'
import Error404 from '@/views/error/404'

import type { RouteObject } from 'react-router'

/** 登录等独立路由配置 */
const baseRoutes: RouteObject[] = [
  {
    path: '/redirect',
  },
  {
    path: '/login',
    element: <Login />,
  },
]

/** 主应用路由配置 */
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
      element: <Error404 />,
    },
  ],
}

export { baseRoutes, mainRoute }
