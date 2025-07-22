import Image403 from '@/assets/icons/403.svg'
import ErrorPage from './components/error'

export default function Error403() {
  return <ErrorPage image={Image403} imageAlt="403 Forbidden" subtitle="当前页面没有权限访问..." />
}
