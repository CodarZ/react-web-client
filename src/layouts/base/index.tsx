import { ProLayout } from '@ant-design/pro-components'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Spin } from 'antd'
import { useUserStore } from '@/stores/user'
import { useRouteStore } from '@/stores/route'
import { useRouteInitializer } from '@/hooks/useRouteInitializer'
import { useRouteRecovery } from '@/hooks/useRouteRecovery'

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userInfo } = useUserStore()
  const { menuData } = useRouteStore()
  const { loading } = useRouteInitializer()

  // 处理页面刷新时的路由恢复
  useRouteRecovery()

  if (typeof document === 'undefined') {
    return <div />
  }

  // 显示加载状态
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" tip="正在加载系统..." />
      </div>
    )
  }

  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        layout="mix"
        route={{
          routes: menuData,
        }}
        avatarProps={{
          src: userInfo?.avatar || '',
          title: userInfo?.nickname,
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              navigate(item.path || '/')
            }}
            style={{ cursor: 'pointer' }}
          >
            {dom}
          </div>
        )}
      >
        <Outlet />
      </ProLayout>
    </div>
  )
}
