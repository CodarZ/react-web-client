import React from 'react'
import { Icon, useIcon, createIcon } from './index'
import type { IconProps } from './Icon'

/**
 * 图标使用示例和类型测试
 */
const IconExample: React.FC = () => {
  // 使用 Hook 方式
  const homeIcon = useIcon('HomeOutlined')
  const userIcon = useIcon('UserOutlined')

  // 类型测试用例
  const basicProps: IconProps = {
    name: 'HomeOutlined',
  }

  const fullProps: IconProps = {
    name: 'UserOutlined',
    style: { fontSize: 24, color: '#1890ff' },
    className: 'my-icon',
    spin: true,
    rotate: 45,
    twoToneColor: '#eb2f96',
    onClick: (e) => console.log('clicked', e),
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>动态图标使用示例</h2>

      {/* 方式1: 使用 Icon 组件 */}
      <div style={{ marginBottom: 16 }}>
        <h3>1. 使用 Icon 组件：</h3>
        <Icon name="HomeOutlined" style={{ fontSize: 24, color: '#1890ff' }} />
        <Icon name="UserOutlined" style={{ fontSize: 32, color: '#52c41a', marginLeft: 10 }} />
        <Icon name="SettingOutlined" style={{ fontSize: 20, color: '#fa541c', marginLeft: 10 }} />
      </div>

      {/* 方式2: 使用 useIcon Hook */}
      <div style={{ marginBottom: 16 }}>
        <h3>2. 使用 useIcon Hook：</h3>
        {homeIcon}
        <span style={{ marginLeft: 10 }}>{userIcon}</span>
      </div>

      {/* 方式3: 使用 createIcon 函数 */}
      <div style={{ marginBottom: 16 }}>
        <h3>3. 使用 createIcon 函数：</h3>
        {createIcon('StarOutlined')}
        <span style={{ marginLeft: 10 }}>{createIcon('HeartOutlined')}</span>
      </div>

      {/* 方式4: 在菜单数据中使用 */}
      <div style={{ marginBottom: 16 }}>
        <h3>4. 菜单数据示例：</h3>
        <pre style={{ background: '#f5f5f5', padding: 10 }}>
          {`const menuData = [
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
]`}
        </pre>
      </div>

      {/* 方式5: 类型安全测试 */}
      <div style={{ marginBottom: 16 }}>
        <h3>5. 类型安全测试：</h3>
        <div style={{ marginBottom: 8 }}>
          <span>基本属性：</span>
          <Icon {...basicProps} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <span>完整属性：</span>
          <Icon {...fullProps} />
        </div>
      </div>

      {/* 方式6: Ant Design 特性测试 */}
      <div style={{ marginBottom: 16 }}>
        <h3>6. Ant Design 特性：</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span>旋转动画：</span>
            <Icon name="LoadingOutlined" spin style={{ fontSize: 20, marginLeft: 8 }} />
          </div>
          <div>
            <span>旋转角度：</span>
            <Icon name="RotateRightOutlined" rotate={45} style={{ fontSize: 20, marginLeft: 8 }} />
          </div>
          <div>
            <span>双色图标：</span>
            <Icon name="SmileTwoTone" twoToneColor="#eb2f96" style={{ fontSize: 20, marginLeft: 8 }} />
          </div>
          <div>
            <span>点击事件：</span>
            <Icon
              name="SettingOutlined"
              style={{ fontSize: 20, marginLeft: 8, cursor: 'pointer' }}
              onClick={() => alert('图标被点击了！')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconExample
