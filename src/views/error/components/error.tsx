import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import './error.scss'

interface ErrorPageProps {
  /** 错误图片 */
  image: string
  /** 错误图片的 alt 文本 */
  imageAlt?: string
  /** 主标题 */
  title?: string
  /** 副标题 */
  subtitle: string
  /** 描述文本 */
  description?: string
}

export default function ErrorPage({
  image,
  imageAlt = '',
  title = '抱歉!',
  subtitle,
  description = '请检查您输入的网址是否正确，或点击下面的按钮返回首页',
}: ErrorPageProps) {
  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/')
  }

  return (
    <PageContainer title={false}>
      <ProCard style={{ height: 'calc(100vh - 160px)' }}>
        <div className="error-page">
          <section className="error__container">
            <div className="error__img">
              <img src={image} alt={imageAlt} />
            </div>

            <div className="error__tip">
              <div className="error__tip--a">{title}</div>
              <div className="error__tip--b">{subtitle}</div>
              <div className="error__tip--c">{description}</div>
            </div>
            <Button type="primary" onClick={backToHome}>
              返回首页
            </Button>
          </section>
        </div>
      </ProCard>
    </PageContainer>
  )
}
