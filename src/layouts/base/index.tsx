import { ProLayout } from '@ant-design/pro-components'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { useUserStore } from '@/stores/user'
import { HomeOutlined } from '@ant-design/icons'

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userInfo } = useUserStore()
  const menuData = [
    {
      key: '/',
      path: '/',
      name: '首页',
      icon: <HomeOutlined />,
      hideChildrenInMenu: false,
      hideInMenu: false,
    },
  ]

  if (typeof document === 'undefined') {
    return <div />
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
