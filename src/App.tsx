import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router'
import router from './router'

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        cssVar: true,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
