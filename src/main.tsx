import '@ant-design/v5-patch-for-react-19'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './styles/index.scss'

// 样式
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs' // 兼容低版本浏览器

// 时间设为中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
      <App />
    </StyleProvider>
  </StrictMode>,
)
