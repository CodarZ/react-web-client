import { Layout, theme } from 'antd'
import { Outlet } from 'react-router'
import { FC } from 'react'

const { Content } = Layout

interface AppContentProps {
  isMobile: boolean
  collapsed: boolean
}

const AppContent: FC<AppContentProps> = ({ isMobile, collapsed }) => {
  console.log('AppContent rendered', { isMobile, collapsed })
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Content
      style={{
        margin: '16px',
        padding: 16,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        minHeight: 'calc(100vh - 64px - 32px - 48px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Outlet />
    </Content>
  )
}

export default AppContent
