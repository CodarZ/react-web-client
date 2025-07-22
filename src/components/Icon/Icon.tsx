import React from 'react'
import * as AntdIcons from '@ant-design/icons'
import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

export interface IconProps extends Omit<AntdIconProps, 'ref'> {
  /** 图标名称 */
  name: string
}

/**
 * 动态图标组件
 * 根据传入的 name 属性动态渲染对应的 Ant Design 图标
 */
const Icon: React.FC<IconProps> = ({ name, ...restProps }) => {
  if (!name) {
    console.warn('Icon component requires a "name" prop')
    return null
  }

  // 从 @ant-design/icons 中获取对应的图标组件
  const IconComponent = (AntdIcons as unknown as Record<string, React.ComponentType<Omit<IconProps, 'name'>>>)[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @ant-design/icons`)
    return null
  }

  return React.createElement(IconComponent, restProps)
}

export default Icon
