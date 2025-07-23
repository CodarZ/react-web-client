import { useEffect, useState } from 'react'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router'
import { createRouter } from './routes'
import { useRouteStore, useUserStore } from '@/stores'
import { useTokenCheck } from './hooks'

export default function App() {
  const { initialized, initRoutes } = useRouteStore()
  const { token } = useUserStore()
  const [router, setRouter] = useState(() => createRouter())
  const [routerKey, setRouterKey] = useState(0)

  useTokenCheck()

  useEffect(() => {
    if (initialized) {
      const newRouter = createRouter()
      setRouter(newRouter)
      setRouterKey((prev) => prev + 1)
    } else if (token && token.trim() !== '') {
      initRoutes()
    }
  }, [initialized, initRoutes, token])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        cssVar: true,
      }}
    >
      <AntdApp>
        <RouterProvider key={routerKey} router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}
