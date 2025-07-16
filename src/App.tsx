import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router'
import { useEffect, useState } from 'react'
import { createRouter } from './routes'
import { useRouteStore } from '@/stores/route'

export default function App() {
  const { initialized } = useRouteStore()
  const [router, setRouter] = useState(() => createRouter())
  const [routerKey, setRouterKey] = useState(0)

  // 当动态路由初始化完成后，重新创建路由器
  useEffect(() => {
    if (initialized) {
      const newRouter = createRouter()
      setRouter(newRouter)
      setRouterKey((prev) => prev + 1) // 强制重新挂载
    }
  }, [initialized])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        cssVar: true,
      }}
    >
      <RouterProvider key={routerKey} router={router} />
    </ConfigProvider>
  )
}
