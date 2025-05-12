import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

export default function App() {
  return (
    <>
      <ConfigProvider locale={zhCN} theme={{ cssVar: true }}>
        <div>Hello World!</div>
      </ConfigProvider>
    </>
  )
}
