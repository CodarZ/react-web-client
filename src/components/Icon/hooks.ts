import * as AntdIcons from '@ant-design/icons'
import { AppstoreOutlined } from '@ant-design/icons'
import { createElement } from 'react'

/**
 * 动态图标 Hook
 * @param name 图标名称
 * @returns React 图标元素或 null
 */
export const useIcon = (name: string): React.ReactElement | null => {
  return useMemo(() => {
    if (!name) return null

    const IconComponent = (AntdIcons as unknown as Record<string, React.ComponentType>)[name]

    if (!IconComponent) {
      // console.warn(`Icon "${name}" not found in @ant-design/icons`)
      return null
    }

    return createElement(IconComponent)
  }, [name])
}

/**
 * 创建图标工具函数
 * @param name 图标名称
 * @returns React 图标元素或 null
 */
export const createIcon = (name: string): React.ReactElement | null => {
  if (!name) return null

  const IconComponent = (AntdIcons as unknown as Record<string, React.ComponentType>)[name]

  if (!IconComponent) {
    // console.warn(`Icon "${name}" not found in @ant-design/icons`)
    return createElement(AppstoreOutlined)
  }

  return createElement(IconComponent)
}
