import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Image, Checkbox } from 'antd'
import type { AnyObject } from 'antd/es/_util/type'
import fallbackImage from '@/assets/icons/fallback-image.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function LoginForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [codeImage, setCodeImage] = useState('')

  useEffect(() => {
    requestCodeImage()
  }, [])

  function requestCodeImage() {
    console.log('请求验证码图片')
    setCodeImage('')
  }

  function requestLogin(values: AnyObject) {
    console.log('模拟登录请求，提交的值：', values)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  function onFinish(values: AnyObject) {
    requestLogin(values)
  }

  return (
    <Form name="loginForm" style={{ width: '100%' }} onFinish={onFinish} autoComplete="off">
      <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
        <Input prefix={<UserOutlined />} placeholder="账号" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
        <Flex justify="space-between" gap={8} align="center">
          <Input prefix={<SafetyCertificateOutlined />} placeholder="验证码" />

          <Image
            preview={false}
            style={{
              height: 'var(--ant-control-height)',
              borderRadius: 'var(--ant-border-radius-sm)',
              cursor: 'pointer',
              aspectRatio: '10 / 3',
            }}
            src={codeImage}
            fallback={fallbackImage}
            onClick={loading ? undefined : requestCodeImage}
          />
        </Flex>
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading} disabled={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
