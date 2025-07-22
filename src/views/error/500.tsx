import Image500 from '@/assets/icons/500.svg'
import ErrorPage from './components/error'

export default function Error500() {
  return <ErrorPage image={Image500} imageAlt="500 Internal Server Error" subtitle="当前系统异常..." />
}
