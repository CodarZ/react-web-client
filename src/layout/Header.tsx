import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Layout, theme, Button } from 'antd'
import { FC } from 'react'

const { Header } = Layout

interface AppHeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const AppHeader: FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        position: 'sticky',
        top: 0,
        zIndex: 98,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        height: '64px',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginLeft: '16px',
          fontSize: '16px',
        }}
      />
      <div style={{ flex: 1 }}></div>
      {/* 右侧操作区域 */}
      <div style={{ paddingRight: 16, display: 'flex', gap: 8 }}>
        <Button type="text" icon={<UserOutlined />} />
        <Button type="text" icon={<SettingOutlined />} />
      </div>
    </Header>
  )
}

export default AppHeader
