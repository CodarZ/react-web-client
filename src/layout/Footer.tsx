import { Layout } from 'antd'
import { FC } from 'react'

const { Footer } = Layout

const AppFooter: FC = () => {
  return (
    <Footer style={{ textAlign: 'center', padding: '12px' }}>
      React Web Client ©{new Date().getFullYear()} Created by Admin
    </Footer>
  )
}

export default AppFooter
