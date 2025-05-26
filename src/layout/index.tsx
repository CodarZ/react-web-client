import { Layout, Grid } from 'antd'
import { useState, useEffect, memo } from 'react'

// 导入拆分后的组件
import AppSider from './Sider'
import AppHeader from './Header'
import AppContent from './Content'
import AppFooter from './Footer'
import Mask from './Mask'

const { useBreakpoint } = Grid

// 使用 memo 优化主布局组件
const DefaultLayout = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const screens = useBreakpoint()

  useEffect(() => {
    // 当屏幕宽度小于 md 断点时（≤768px），视为移动设备
    setIsMobile(!(screens.md || false))
    // 在移动设备上默认折叠侧边栏
    if (!(screens.md || false)) {
      setCollapsed(true)
    } else if (screens.lg || false) {
      // 在大屏上默认展开
      setCollapsed(false)
    }
  }, [screens])

  // 点击蒙层时收起侧边栏
  const handleMaskClick = () => {
    if (isMobile) {
      setCollapsed(true)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 移动设备下显示蒙层 */}
      {isMobile && !collapsed && <Mask onClick={handleMaskClick} />}

      {/* 侧边栏组件 */}
      <AppSider collapsed={collapsed} isMobile={isMobile} />

      <Layout
        style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 220, transition: 'margin-left 0.2s' }}
      >
        {/* 头部组件 */}
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* 内容区域组件 */}
        <AppContent isMobile={isMobile} collapsed={collapsed} />

        {/* 底部组件 */}
        <AppFooter />
      </Layout>
    </Layout>
  )
})

export default DefaultLayout
