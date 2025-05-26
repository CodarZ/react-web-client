import { HomeOutlined, DashboardOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { FC, memo } from 'react'
import { useLocation, useNavigate } from 'react-router' // 导入 useNavigate
import { SiderProps } from './types'

const { Sider } = Layout

// 使用 memo 优化侧边栏组件
const AppSider: FC<SiderProps> = memo(({ collapsed, isMobile }) => {
  const location = useLocation()
  const navigate = useNavigate() // 使用 useNavigate hook

  // 菜单项配置
  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: '首页' },
    {
      key: '/error',
      icon: <DashboardOutlined />,
      label: '错误页面',
      children: [
        { label: '403 错误', key: '/error/403' },
        { label: '404 错误', key: '/error/404' },
      ],
    },
  ]

  // 处理菜单点击事件
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key) // 导航到点击的路由路径
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      collapsedWidth={isMobile ? 0 : 80}
      width={220}
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            fontSize: collapsed ? '16px' : '18px',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {isMobile && collapsed ? '' : collapsed ? 'RW' : 'React Web'}
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]} // 使用 selectedKeys 替代 defaultSelectedKeys 使选中状态动态变化
          style={{ borderRight: 0 }}
          items={menuItems}
          onClick={handleMenuClick} // 添加点击事件处理
        />
      </div>
    </Sider>
  )
})

export default AppSider
