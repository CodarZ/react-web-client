import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message } from 'antd'
import { useUserStore } from '@/stores/user'
import { useNavigate } from 'react-router'

import type { FC } from 'react'

const { Item } = Form

const Login: FC = () => {
  const { setToken, setUserInfo } = useUserStore()
  const navigate = useNavigate()
  const onFinish = async () => {
    // 设置token
    setToken('token_example')

    // 设置用户信息
    setUserInfo({
      id: '1',
      nickname: '超级管理员',
      username: 'admin',
      roles: ['admin', 'static.sdf.editor'],
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    })
    message.success('登录成功')
    navigate('/')
  }

  return (
    <Card style={{ margin: '160px auto', maxWidth: '480px' }}>
      <Form name="login" size={'large'} initialValues={{ remember: true }} onFinish={onFinish}>
        <Item
          name="username"
          rules={[
            { required: true, whitespace: true, message: '请输入用户名!' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文，数字或者下划线!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Item>
        <Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登 录
          </Button>
        </Item>
      </Form>
    </Card>
  )
}
export default Login
