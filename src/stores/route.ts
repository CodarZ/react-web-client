import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createIcon } from '@/components/Icon'
import { transToMenuDataItem, transToRouteObject } from '@/utils'
import { getSystemRoutes } from '@/apis/static/system'

import type { RouteObject } from 'react-router'
import type { MenuDataItem } from '@ant-design/pro-components'

// 动态路由状态接口
interface RouteState {
  /** 请求的路由信息 */
  systemRoutes: RouteType[]
  /** 系统菜单 */
  menuData: MenuDataItem[]
  /** 动态路由, 需要添加到 router 路由表渲染文件 */
  dynamicRoutes: RouteObject[]
  /** 是否已初始化, 用于判断是否需要重新加载路由 */
  initialized: boolean

  /** 初始化路由 */
  initRoutes: () => Promise<void>
  /** 从缓存恢复 */
  rebuildFromCache: () => void
  clearRoutes: () => void
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      systemRoutes: [],
      dynamicRoutes: [],
      menuData: getDefaultMenuDataItem(),
      initialized: false,

      initRoutes: async () => {
        const { initialized } = get()

        if (initialized) return

        // 步骤1: 请求路由信息
        const systemRoutes = await getSystemRoutes()

        // 步骤2: 格式化为菜单数据
        const dynamicMenuDataItem = transToMenuDataItem(systemRoutes)
        const menuData = [...dynamicMenuDataItem]

        // 步骤3: 转换为动态路由对象
        const dynamicRoutes = transToRouteObject(systemRoutes)

        console.log('初始化路由信息成功:', { systemRoutes, menuData, dynamicRoutes })

        set({
          systemRoutes,
          menuData,
          dynamicRoutes,
          initialized: true,
        })
      },

      rebuildFromCache: () => {
        const { systemRoutes } = get()
        if (systemRoutes.length > 0) {
          const menuData = transToMenuDataItem(systemRoutes)
          const dynamicRoutes = transToRouteObject(systemRoutes)

          set({
            menuData,
            dynamicRoutes,
            initialized: true,
          })
        } else {
          set({
            systemRoutes: [],
            dynamicRoutes: [],
            menuData: getDefaultMenuDataItem(),
            initialized: true,
          })
        }
      },

      clearRoutes: () => {
        set({
          systemRoutes: [],
          dynamicRoutes: [],
          menuData: getDefaultMenuDataItem(),
          initialized: false,
        })
      },
    }),
    {
      name: 'route',
      partialize: (state) => ({
        systemRoutes: state.systemRoutes,
        initialized: state.initialized,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.systemRoutes && state.systemRoutes.length > 0) {
          setTimeout(() => {
            // 恢复时重建路由
            state.rebuildFromCache()
          }, 0)
        }
      },
    },
  ),
)

/**
 * 菜单数据
 *
 * 默认会显示菜单数据, 不需要动态请求的路由信息
 *
 * 比如不需要任何权限的首页, 开发中的 test, example 等页面
 */
function getDefaultMenuDataItem(): MenuDataItem[] {
  return [
    {
      key: '/',
      path: '/',
      name: '首页',
      icon: createIcon('HomeOutlined'),
      hideChildrenInMenu: false,
      hideInMenu: false,
    },
  ]
}
