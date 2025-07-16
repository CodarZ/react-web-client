import React, { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router'
import Layout from '../layouts/base/index'

export type RouteType = {
  /** 组件名称 */
  name?: string
  /** 地址栏路径 */
  path: string
  /** 是否隐藏 */
  hidden?: boolean
  /** 重定向路径 */
  redirect?: string
  /** 组件所在路径 */
  component: string
  /** 一直显示 */
  alwaysShow?: boolean
  meta: {
    /** 菜单标题 */
    title?: string
    /** 菜单图标 */
    icon?: string
    /** 是否缓存 */
    noCache?: boolean
    /** 外部链接 */
    link?: null
  }
  children?: RouteType[]
}

// 组件缓存
const componentCache = new Map<string, React.ComponentType<Record<string, unknown>>>()

// 根据组件路径动态加载组件
export function loadComponent(componentPath: string) {
  if (!componentPath) return null

  // 处理 Layout 组件特殊情况
  if (componentPath.includes('Layout')) {
    return Layout
  }

  // 检查缓存
  if (componentCache.has(componentPath)) {
    return componentCache.get(componentPath)!
  }

  // 转换路径格式
  let normalizedPath = componentPath

  if (componentPath.startsWith('@/views')) {
    // 处理 @/views 开头的路径：@/views/home/index -> ../views/home/index
    normalizedPath = componentPath.replace('@/', '../').replace(/\/[A-Z][a-zA-Z0-9]*$/, '/index')
  } else if (componentPath.startsWith('/')) {
    // 处理 / 开头的路径：/settings/role/index -> ../views/settings/role/index
    normalizedPath = `../views${componentPath}`
    // 如果路径不以 .tsx 结尾，添加 .tsx
    if (!normalizedPath.endsWith('.tsx') && !normalizedPath.endsWith('.ts')) {
      normalizedPath += '.tsx'
    }
  } else {
    normalizedPath = componentPath
  }

  try {
    // 使用 lazy 动态导入
    const LazyComponent = lazy(() => import(/* @vite-ignore */ normalizedPath))

    // 创建带 Suspense 的组件包装器
    const WrappedComponent = (props: Record<string, unknown>) => (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    )

    // 缓存组件
    componentCache.set(componentPath, WrappedComponent)

    return WrappedComponent
  } catch (error) {
    console.error(`Failed to load component: ${componentPath}`, error)
    return null
  }
}

// 将 RouteType 转换为 React Router 的 RouteObject
export function convertToRouteObject(route: RouteType): RouteObject {
  if (route.path === '/' && route.name === 'home') {
    // 处理首页索引路由
    const Component = loadComponent(route.component)
    return {
      index: true,
      element: Component ? <Component /> : undefined,
    }
  }

  const routeObject: RouteObject = {
    path: route.path,
  }

  if (route.component) {
    const Component = loadComponent(route.component)
    if (Component) {
      routeObject.element = <Component />
    }
  }

  if (route.children) {
    routeObject.children = route.children.map(convertToRouteObject)
  }

  return routeObject
}

// 菜单项类型
interface MenuItem {
  path: string
  name: string
  icon?: string
  children?: MenuItem[]
}

// 将 RouteType 转换为 ProLayout 菜单格式
export function routeToMenu(routes: RouteType[]): MenuItem[] {
  return routes
    .filter((route) => !route.hidden) // 过滤隐藏的路由
    .map((route) => {
      const menu: MenuItem = {
        path: route.path,
        name: route.meta.title || '',
        icon: route.meta.icon,
      }

      if (route.children && route.children.length > 0) {
        const childMenus = routeToMenu(route.children)
        if (childMenus.length > 0) {
          menu.children = childMenus
        }
      }

      return menu
    })
}
