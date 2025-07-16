import { ProLayout } from '@ant-design/pro-components'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { mainRoute } from '@/routes/constants'
import type { RouteObject } from 'react-router'

interface MenuItem {
  path: string
  name: string
  children?: MenuItem[]
}

// 将路由配置转换为 ProLayout 菜单格式
function routeToMenu(routes: RouteObject[]): MenuItem[] {
  return routes
    .map((route) => {
      // 处理索引路由
      if (route.index) {
        return {
          path: '/',
          name: '首页',
        }
      }

      const menu: MenuItem = {
        path: route.path || '',
        name: getMenuName(route.path || ''),
      }

      if (route.children) {
        const childMenus = routeToMenu(route.children.filter((child: RouteObject) => child.path && child.path !== '*'))
        if (childMenus.length > 0) {
          // 为子菜单添加完整路径
          menu.children = childMenus.map((child) => ({
            ...child,
            path: `${menu.path}/${child.path}`.replace('//', '/'),
          }))
        }
      }

      return menu
    })
    .filter((item) => item.path && item.path !== '*')
}

// 根据路径生成菜单名称
function getMenuName(path: string): string {
  if (path === '/') return '首页'
  if (path === '/error') return '错误页面'
  if (path === '404') return '404页面'
  if (path === '403') return '403页面'
  return path.replace('/', '')
}

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  if (typeof document === 'undefined') {
    return <div />
  }

  // 从路由配置生成菜单数据
  const menuData = mainRoute.children ? routeToMenu(mainRoute.children) : []

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
