import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Image, Checkbox, message } from 'antd'
import fallbackImage from '@/assets/icons/fallback-image.png'
import { useEffect, useState } from 'react'
import { useUserStore, useRouteStore } from '@/stores'
import type { AnyObject } from 'antd/es/_util/type'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [codeImage, setCodeImage] = useState('')

  const { setToken, setUserInfo } = useUserStore()
  const { initRoutes } = useRouteStore()

  useEffect(() => {
    requestCodeImage()
  }, [])

  function requestCodeImage() {
    console.log('请求验证码图片')
    setCodeImage('')
  }

  function requestToken(values: AnyObject): Promise<string | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟 token 获取，假设用户名为 admin 时成功
        if (values.username === 'admin') {
          resolve('mock-token-123')
        } else {
          message.error('获取登录 Token 失败')
          resolve(null)
        }
      }, 800)
    })
  }

  function requestUserInfo(token: string): Promise<UserInfo | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token) {
          resolve({
            id: '1',
            nickname: '超级管理员',
            username: 'admin',
            roles: ['admin', 'static.sdf.editor'],
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          })
        } else {
          message.error('获取用户信息失败')
          resolve(null)
        }
      }, 800)
    })
  }

  async function requestLogin(values: AnyObject) {
    console.log('模拟登录请求，提交的值：', values)
    setLoading(true)

    // 获取 token
    const token = await requestToken(values)
    if (!token) {
      setLoading(false)
      return
    }
    setToken(token)

    // 获取用户信息
    const userInfo = await requestUserInfo(token)
    if (userInfo) {
      setUserInfo(userInfo)
    } else {
      message.warning('用户信息获取失败')
    }

    // 必须等待，初始化路由后，才能进入系统。否则没有路由信息匹配不到的
    await initRoutes()

    const { initialized: currentInitialized } = useRouteStore.getState()

    if (currentInitialized) {
      message.success('登录成功')

      setTimeout(() => {
        setLoading(false)
        window.location.href = '/'
      }, 500)
    } else {
      setLoading(false)
    }
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
