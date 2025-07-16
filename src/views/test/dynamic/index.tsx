export default function TestDynamicRoute() {
  return (
    <div style={{ padding: 20 }}>
      <h2>动态路由测试成功！</h2>
      <p>这个页面是通过动态路由加载的</p>
      <div
        style={{
          background: '#f0f8ff',
          padding: 16,
          borderRadius: 8,
          border: '1px solid #1890ff',
        }}
      >
        <h3>测试信息：</h3>
        <ul>
          <li>✅ 动态路由加载成功</li>
          <li>✅ 组件路径解析正确</li>
          <li>✅ 只查找 index.tsx 文件</li>
          <li>✅ 使用 Vite glob import 功能</li>
        </ul>
      </div>
    </div>
  )
}
