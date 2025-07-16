import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuDataItem } from '@ant-design/pro-components'
import type { RouteObject } from 'react-router'
import { lazy, createElement } from 'react'
import { getSystemRoutes } from '@/apis/static/system'

// 使用 Vite 的 glob import 功能进行动态加载（只处理 .tsx 文件）
const allModules = import.meta.glob('/src/views/**/*.tsx', { eager: false })

// 过滤掉 component/components 文件夹下的文件
const modules = Object.keys(allModules).reduce(
  (acc, key) => {
    if (!key.includes('/component/') && !key.includes('/components/')) {
      acc[key] = allModules[key]
    }
    return acc
  },
  {} as Record<string, () => Promise<unknown>>,
)

// 动态路由状态接口
interface RouteState {
  // 原始路由数据
  systemRoutes: RouteType[]
  // 格式化后的菜单数据
  menuData: MenuDataItem[]
  // 动态路由对象
  dynamicRoutes: RouteObject[]
  // 加载状态
  loading: boolean
  // 是否已初始化
  initialized: boolean

  // 操作方法
  initializeRoutes: () => Promise<void>
  rebuildFromCache: () => void
  clearRoutes: () => void
}

// 动态组件加载函数
const loadComponent = (componentPath: string) => {
  try {
    // 检查是否是布局组件
    if (componentPath === 'Layout' || componentPath === 'ParentView') {
      return lazy(() => import('@/views/error/404'))
    }

    console.log(`Loading component: ${componentPath}`)

    // 尝试不同的路径格式
    const possiblePaths = [
      `/src/views/${componentPath}.tsx`, // 直接的 .tsx 文件
      `/src/views/${componentPath}/index.tsx`, // index.tsx 文件
    ]

    for (const path of possiblePaths) {
      if (modules[path]) {
        console.log(`Found component at: ${path}`)
        return lazy(modules[path] as () => Promise<{ default: React.ComponentType }>)
      }
    }

    // 如果找不到，返回 404
    return lazy(() => import('@/views/error/404'))
  } catch (error) {
    console.error(`Failed to load component: ${componentPath}`, error)
    // 返回 404 组件作为备用
    return lazy(() => import('@/views/error/404'))
  }
}

// 获取默认菜单数据（只包含首页）
const getDefaultMenuData = (): MenuDataItem[] => {
  return [
    {
      key: '/',
      path: '/',
      name: '首页',
      icon: 'HomeOutlined',
      hideChildrenInMenu: false,
      hideInMenu: false,
    },
  ]
}

// 将 RouteType 转换为 MenuDataItem（递归处理子菜单，不添加首页）
const transformToMenuDataRecursive = (routes: RouteType[]): MenuDataItem[] => {
  return routes
    .filter((route) => !route.hidden)
    .map((route) => ({
      key: route.path,
      path: route.path,
      name: route.meta.title,
      icon: route.meta.icon,
      hideChildrenInMenu: route.hidden,
      hideInMenu: route.hidden,
      children: route.children ? transformToMenuDataRecursive(route.children) : undefined,
    }))
}

// 将 RouteType 转换为 MenuDataItem（顶层添加首页）
const transformToMenuData = (routes: RouteType[]): MenuDataItem[] => {
  // 固定的首页菜单项
  const homeMenuItem: MenuDataItem = {
    key: '/',
    path: '/',
    name: '首页',
    icon: 'HomeOutlined',
    hideChildrenInMenu: false,
    hideInMenu: false,
  }

  // 动态路由菜单项（使用递归函数处理子菜单）
  const dynamicMenuItems = transformToMenuDataRecursive(routes)

  // 返回首页 + 动态菜单项
  return [homeMenuItem, ...dynamicMenuItems]
}

// 将 RouteType 转换为 React Router 的 RouteObject
const transformToRouteObject = (routes: RouteType[]): RouteObject[] => {
  return routes
    .filter((route) => !route.hidden) // 过滤隐藏的路由
    .map((route) => {
      const isLayoutComponent = route.component === 'Layout' || route.component === 'ParentView'

      const routeObject: RouteObject = {
        path: route.path,
      }

      // 对于布局容器，不设置 element，只作为路由容器
      if (!isLayoutComponent) {
        const Component = loadComponent(route.component)
        routeObject.element = createElement(Component)
      }

      // 处理子路由
      if (route.children && route.children.length > 0) {
        routeObject.children = transformToRouteObject(route.children)
      }

      return routeObject
    })
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      systemRoutes: [],
      menuData: getDefaultMenuData(), // 初始化时就有首页菜单
      dynamicRoutes: [],
      loading: false,
      initialized: false,

      initializeRoutes: async () => {
        const { initialized, loading } = get()

        // 防止重复初始化
        if (initialized || loading) return

        set({ loading: true })

        try {
          // 步骤1: 请求路由信息
          const systemRoutes = await getSystemRoutes()

          // 步骤2: 格式化为菜单数据
          const menuData = transformToMenuData(systemRoutes)

          // 步骤3: 转换为动态路由对象
          const dynamicRoutes = transformToRouteObject(systemRoutes)

          set({
            systemRoutes,
            menuData,
            dynamicRoutes,
            initialized: true,
            loading: false,
          })
        } catch (error) {
          console.error('Failed to initialize routes:', error)
          set({ loading: false })
        }
      },

      // 从缓存的数据重新构建路由（页面刷新时使用）
      rebuildFromCache: () => {
        const { systemRoutes } = get()
        if (systemRoutes.length > 0) {
          const menuData = transformToMenuData(systemRoutes)
          const dynamicRoutes = transformToRouteObject(systemRoutes)

          set({
            menuData,
            dynamicRoutes,
            initialized: true,
            loading: false,
          })
        } else {
          // 如果没有系统路由，至少显示首页菜单
          set({
            menuData: getDefaultMenuData(),
            dynamicRoutes: [],
            initialized: true,
            loading: false,
          })
        }
      },

      clearRoutes: () =>
        set({
          systemRoutes: [],
          menuData: getDefaultMenuData(), // 清除时也保留首页菜单
          dynamicRoutes: [],
          initialized: false,
          loading: false,
        }),
    }),
    {
      name: 'route',
      // 持久化更多数据，包括初始化状态
      partialize: (state) => ({
        systemRoutes: state.systemRoutes,
        initialized: state.initialized,
      }),
      // 恢复时重建路由
      onRehydrateStorage: () => (state) => {
        if (state?.systemRoutes && state.systemRoutes.length > 0) {
          // 延迟重建，确保组件已经挂载
          setTimeout(() => {
            state.rebuildFromCache()
          }, 0)
        }
      },
    },
  ),
)
