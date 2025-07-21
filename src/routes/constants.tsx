import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router'
import Layout from '@/layouts/base/index'
import Home from '@/views/home'
import Login from '@/views/login'
import Error403 from '@/views/error/403'
import Error404 from '@/views/error/404'

export const baseRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/redirect',
  },
  {
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
  },
]
