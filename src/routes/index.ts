import { createBrowserRouter } from 'react-router'
import { baseRoutes } from './constants'

export const createRouter = () => {
  return createBrowserRouter([...baseRoutes])
}

const router = createRouter()

export default router
