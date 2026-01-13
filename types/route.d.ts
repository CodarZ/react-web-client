/** 路由元数据接口 */
export interface RouteMeta {
  /** 页面标题 */
  title?: string;
  /** 菜单显示名称 */
  navLabel?: string;
  /** 菜单图标 (Antd Icon Name) */
  icon?: string;
  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean;
  /** 菜单排序 */
  order?: number;
}

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    meta?: RouteMeta;
  }
}
