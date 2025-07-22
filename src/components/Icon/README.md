# 动态图标组件

这个动态图标系统允许你根据字符串名称动态渲染 Ant Design 图标，无需手动导入每个图标。

## 文件结构

```tree
src/components/Icon/
├── Icon.tsx        # 主图标组件
├── hooks.ts        # 图标相关 Hooks 和工具函数
├── index.ts        # 导出文件
├── example.tsx     # 完整使用示例和类型测试
└── README.md       # 说明文档
```

## 使用方法

### 1. 使用 Icon 组件（推荐）

```tsx
import { Icon } from '@/components/Icon'

function MyComponent() {
  return (
    <div>
      <Icon name="HomeOutlined" />
      <Icon name="UserOutlined" style={{ fontSize: 24, color: '#1890ff' }} />
      <Icon name="SettingOutlined" style={{ fontSize: 32, color: '#52c41a' }} />
      
      {/* Ant Design 特性 */}
      <Icon name="LoadingOutlined" spin />
      <Icon name="RotateRightOutlined" rotate={45} />
      <Icon name="SmileTwoTone" twoToneColor="#eb2f96" />
    </div>
  )
}
```

### 2. 使用 useIcon Hook

```tsx
import { useIcon } from '@/components/Icon'

function MyComponent() {
  const homeIcon = useIcon('HomeOutlined')
  const userIcon = useIcon('UserOutlined')
  
  return (
    <div>
      {homeIcon}
      {userIcon}
    </div>
  )
}
```

### 3. 使用 createIcon 函数

```tsx
import { createIcon } from '@/components/Icon'

// 在菜单数据中使用
const menuData = [
  {
    key: '/',
    path: '/',
    name: '首页',
    icon: createIcon('HomeOutlined'),
  },
  {
    key: '/user',
    path: '/user',
    name: '用户管理',
    icon: createIcon('UserOutlined'),
  },
]

// 在 ProLayout 中使用
function Layout() {
  return (
    <ProLayout
      route={{ routes: menuData }}
      // ... 其他配置
    />
  )
}
```

## API

### Icon 组件 Props

`IconProps` 继承自 Ant Design 图标的所有原生属性，并添加了 `name` 属性：

| 参数      | 说明     | 类型                                    | 默认值 |
|-----------|----------|----------------------------------------|--------|
| name      | 图标名称 | `string`                               | -      |
| style     | 图标样式 | `React.CSSProperties`                  | -      |
| className | CSS 类名 | `string`                               | -      |
| onClick   | 点击事件 | `(event: React.MouseEvent) => void`    | -      |
| spin      | 旋转动画 | `boolean`                              | false  |
| rotate    | 旋转角度 | `number`                               | -      |
| twoToneColor | 双色图标颜色 | `string`                         | -      |

更多属性请参考 [Ant Design Icon 文档](https://ant.design/components/icon-cn#api)

### useIcon Hook

```tsx
const useIcon = (name: string): React.ReactElement | null
```

### createIcon 函数

```tsx
const createIcon = (name: string): React.ReactElement | null
```

## 支持的图标

所有 `@ant-design/icons` 包中的图标都支持，例如：

- `HomeOutlined`
- `UserOutlined`
- `SettingOutlined`
- `StarOutlined`
- `HeartOutlined`
- `PlusOutlined`
- `EditOutlined`
- `DeleteOutlined`
- 等等...

完整图标列表请参考：[Ant Design Icon](https://ant.design/components/icon-cn)

## 注意事项

1. 图标名称必须是 `@ant-design/icons` 中存在的图标名称
2. 如果图标名称不存在，组件会在控制台输出警告并返回 `null`
3. 建议使用 Icon 组件而不是 Hook 或函数，因为组件提供了更多的配置选项
4. 图标是按需渲染的，但所有图标都会被打包，如果需要减小包大小，可以考虑按需导入

## 性能优化

- `useIcon` Hook 使用了 `useMemo` 来避免不必要的重新渲染
- 图标组件是轻量级的，不会对性能造成显著影响
- 建议在列表渲染时使用 `React.memo` 包装包含图标的组件
