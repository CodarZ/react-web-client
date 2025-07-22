import { ConfigProvider, theme, App as AntdApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router'
import { createRouter } from './routes'
import { useRouteStore } from '@/stores'

export default function App() {
  const { initialized, initRoutes } = useRouteStore()
  const [router, setRouter] = useState(() => createRouter())
  const [routerKey, setRouterKey] = useState(0)

  useEffect(() => {
    if (initialized) {
      const newRouter = createRouter()
      setRouter(newRouter)
      setRouterKey((prev) => prev + 1)
    } else {
      initRoutes()
    }
  }, [initialized, initRoutes])

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
