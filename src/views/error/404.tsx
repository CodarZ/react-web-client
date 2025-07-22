import Image404 from '@/assets/icons/404.svg'
import ErrorPage from './components/error'

export default function Error404() {
  return <ErrorPage image={Image404} imageAlt="404 Not Found" subtitle="当前页面不存在..." />
}
