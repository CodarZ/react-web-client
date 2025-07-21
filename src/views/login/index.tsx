import { Col, Row } from 'antd'
import LoginBackgroundImage from '@/assets/login-bg.svg'
import LoginBackground from './components/LoginBackground/LoginBackground'
import LoginForm from './components/LoginForm/LoginForm'
import './index.scss'

export default function LoginPage() {
  return (
    <div className="login">
      <Row align="stretch" className="login-box">
        <Col xs={0} sm={12} md={14}>
          <div className="login-left">
            <img className="login-left__img" src={LoginBackgroundImage} />
          </div>
        </Col>
        <Col xs={24} sm={12} md={10}>
          <div className="login-right">
            <h3 className="login-right__title"> Web Client </h3>
            <LoginForm />
          </div>
        </Col>
      </Row>

      <LoginBackground />
    </div>
  )
}
