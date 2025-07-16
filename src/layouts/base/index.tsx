import { ProLayout } from '@ant-design/pro-components'
import { Outlet, useLocation, useNavigate } from 'react-router'

// 静态菜单数据
const menuData = [
  {
    path: '/',
    name: '首页',
    icon: '',
  },
]

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  if (typeof document === 'undefined') {
    return <div />
  }

  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        layout="mix"
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          title: '超级管理员',
        }}
        menu={{
          request: async () => {
            return menuData
          },
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
