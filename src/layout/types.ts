// 定义通用类型和接口，用于布局组件间共享

// 侧边栏组件Props接口
export interface SiderProps {
  collapsed: boolean
  isMobile: boolean
}

// 头部组件Props接口
export interface HeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

// 内容区域组件Props接口
export interface ContentProps {
  isMobile: boolean
  collapsed: boolean
}

// 蒙层组件Props接口
export interface MaskProps {
  onClick: () => void
}
