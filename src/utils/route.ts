import { createElement } from 'react'
import type { RouteObject } from 'react-router'
import type { MenuDataItem } from '@ant-design/pro-components'

// 页面模块文件
const fileModules = import.meta.glob(
  [
    '../views/**/*.tsx',
    '!../views/home/index.tsx',
    '!../views/login/**/*.tsx',
    '!../views/error/*.tsx',
    '!../views/**/component{s,}/**/*',
  ],
  {
    eager: false,
  },
)

/** 将后端返回的 route 对象, 转为 MenuDataItem  */
export function transToMenuDataItem(routes: RouteType[]): MenuDataItem[] {
  // 固定的首页菜单项
  const staticMenuDataItems = [
    {
      key: '/',
      path: '/',
      name: '首页',
      icon: 'HomeOutlined',
      hideChildrenInMenu: false,
      hideInMenu: false,
    },
  ]

  const dynamicMataItems = _transformRoutes<MenuDataItem>(routes, (route, children) => ({
    key: route.path,
    path: route.path,
    name: route.meta.title,
    icon: route.meta.icon,
    hideChildrenInMenu: route.hidden,
    hideInMenu: route.hidden,
    children,
    elementPath: route.component, // 页面文件路径
  }))

  return [...staticMenuDataItems, ...dynamicMataItems]
}

/** 将后端返回的 route 对象, 转为 React Router 的 RouteObject */
export function transToRouteObject(routes: RouteType[]) {
  return _transformRoutes<RouteObject>(routes, (route, children) => {
    const routeObject: RouteObject = {
      path: route.path,
    }

    // 对于特殊容器, 需要特殊处理
    if (!route.component || route.component === 'Layout' || route.component === 'ParentView') {
      const file = _loadPageFile(route.component)
      if (file) {
        routeObject.element = createElement(file)
      }
    }

    if (children) {
      routeObject.children = children
    }

    return routeObject
  })
}

/**
 * 根据页面 string 路径转为实际文件模块
 * 要求页面文件需要在 views 下, 非 component(s) 目录下, 并且文件名为 index.tsx
 */
function _loadPageFile(pagePath: string) {
  try {
    // 特殊页面、容器 关键词 需要特殊处理
    if (!pagePath) {
      return
    } else if (pagePath === 'Layout') {
      return
    } else if (pagePath === 'ParentView') {
      return
    }

    const path = `../views/${pagePath}/index.tsx`
    if (fileModules[path]) {
      return lazy(fileModules[path] as () => Promise<{ default: React.ComponentType }>)
    }
    return lazy(() => import('@/views/error/404'))
  } catch (error) {
    console.error(`Failed to load component: ${pagePath}`, error)
    return lazy(() => import('@/views/error/404'))
  }
}

/** 通用路由转换函数 */
function _transformRoutes<T>(routes: RouteType[], transformer: (route: RouteType, children?: T[]) => T): T[] {
  return routes
    .filter((route) => !route.hidden)
    .map((route) => {
      const transformedChildren =
        route.children && route.children.length > 0 ? _transformRoutes(route.children, transformer) : undefined

      return transformer(route, transformedChildren)
    })
}
