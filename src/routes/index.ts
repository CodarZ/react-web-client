import { createBrowserRouter } from 'react-router'
import { baseRoutes, createMainRoutes } from './constants'
import { useRouteStore } from '@/stores'

export function createRouter() {
  const { dynamicRoutes } = useRouteStore.getState()

  const finalMainRoute = createMainRoutes(dynamicRoutes || [])

  return createBrowserRouter([...baseRoutes, finalMainRoute])
}

const router = createRouter()

export default router
