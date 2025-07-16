type RouteType = {
  /** 组件名称 */
  name: string
  /** 访问地址栏 路径 */
  path: string
  /** 是否隐藏 */
  hidden: boolean
  /** 重定向路径 */
  redirect: string
  /** 渲染组件 路径 */
  component: string
  /** 一直显示 */
  alwaysShow: boolean
  meta: {
    /** 菜单标题 */
    title: string
    /** 菜单图标 */
    icon: string
    /** 是否缓存 */
    noCache: boolean
    /** 外部链接 */
    link?: string | null
  }
  children?: RouteType[]
}
