import { createBrowserRouter } from 'react-router'
import { baseRoutes, mainRoute } from './constants'

// 推荐使用这种方式，将独立路由与主应用路由合并
const router = createBrowserRouter([...baseRoutes, mainRoute])

export default router
