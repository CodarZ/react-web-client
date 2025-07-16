import { useEffect } from 'react'
import { useRouteStore } from '@/stores/route'
import { useUserStore } from '@/stores/user'
import type { MenuDataItem } from '@ant-design/pro-components'
import type { RouteObject } from 'react-router'

/**
 * 动态路由测试组件
 * 用于验证刷新页面后路由是否正常
 */
export default function RouteTest() {
  const { systemRoutes, menuData, dynamicRoutes, initialized, loading } = useRouteStore()
  const { isLoggedIn } = useUserStore()

  // 递归渲染菜单树结构
  const renderMenuTree = (menuItems: MenuDataItem[], level = 0) => {
    return menuItems.map((item) => (
      <div key={item.key} style={{ marginLeft: level * 20 }}>
        <div
          style={{
            padding: '4px 8px',
            background: level === 0 ? '#e6f7ff' : '#f0f0f0',
            borderRadius: 4,
            marginBottom: 4,
          }}
        >
          <strong>{item.name}</strong> ({item.path})
          {item.children && <span style={{ color: '#666' }}> - {item.children.length} 个子菜单</span>}
        </div>
        {item.children && renderMenuTree(item.children, level + 1)}
      </div>
    ))
  }

  // 递归渲染路由结构
  const renderRouteTree = (routes: RouteObject[], level = 0): React.ReactNode => {
    return routes.map((route, index) => (
      <div key={route.path || index} style={{ marginLeft: level * 20 }}>
        <div
          style={{
            padding: '4px 8px',
            background: route.element ? '#f6ffed' : '#fff1f0',
            borderRadius: 4,
            marginBottom: 4,
            border: route.element ? '1px solid #b7eb8f' : '1px solid #ffccc7',
          }}
        >
          <strong>{route.path}</strong>
          {route.element ? (
            <span style={{ color: '#52c41a' }}> ✓ 有组件</span>
          ) : (
            <span style={{ color: '#ff4d4f' }}> ✗ 布局容器</span>
          )}
          {route.children && <span style={{ color: '#666' }}> - {route.children.length} 个子路由</span>}
        </div>
        {route.children && renderRouteTree(route.children, level + 1)}
      </div>
    ))
  }

  useEffect(() => {
    console.log('=== Route Test Info ===')
    console.log('User logged in:', isLoggedIn)
    console.log('Routes initialized:', initialized)
    console.log('Routes loading:', loading)
    console.log('System routes count:', systemRoutes.length)
    console.log('Menu data count:', menuData.length)
    console.log('Dynamic routes count:', dynamicRoutes.length)
    console.log('System routes:', systemRoutes)
    console.log('Menu data:', menuData)
    console.log('Dynamic routes:', dynamicRoutes)
    console.log('=======================')
  }, [isLoggedIn, initialized, loading, systemRoutes, menuData, dynamicRoutes])

  return (
    <div style={{ padding: 20 }}>
      <h2>动态路由测试页面</h2>

      <div style={{ marginBottom: 16 }}>
        <h3>状态信息：</h3>
        <p>用户已登录: {isLoggedIn ? '是' : '否'}</p>
        <p>路由已初始化: {initialized ? '是' : '否'}</p>
        <p>路由加载中: {loading ? '是' : '否'}</p>
        <p>系统路由数量: {systemRoutes.length}</p>
        <p>菜单数据数量: {menuData.length}</p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>菜单树结构：</h3>
        <div style={{ background: '#fafafa', padding: 16, borderRadius: 4 }}>{renderMenuTree(menuData)}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>动态路由结构：</h3>
        <div style={{ background: '#fafafa', padding: 16, borderRadius: 4 }}>
          <p style={{ marginBottom: 8, color: '#666' }}>
            <span style={{ color: '#52c41a' }}>✓ 绿色</span>：有具体组件的路由 |
            <span style={{ color: '#ff4d4f' }}>✗ 红色</span>：布局容器（component: 'Layout' 或 'ParentView'）
          </p>
          {renderRouteTree(dynamicRoutes)}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>系统路由详情：</h3>
        <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>
          {JSON.stringify(systemRoutes, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>菜单数据详情：</h3>
        <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>{JSON.stringify(menuData, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>测试说明：</h3>
        <ol>
          <li>确认用户已登录状态</li>
          <li>确认路由已初始化</li>
          <li>确认菜单数据已加载</li>
          <li>刷新页面验证数据是否持久化</li>
          <li>
            <strong>检查"统计图表"子菜单数量是否正确（应该是2个，不是3个）</strong>
          </li>
        </ol>
      </div>
    </div>
  )
}
