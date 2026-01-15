import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { LockOutlined, PictureOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Image, Input, theme } from 'antd';

import { message } from '@/libs/antd-static';

interface LoginFormValues {
  username: string;
  password: string;
  captcha: string;
  remember: boolean;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<LoginFormValues>();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  function onFinish(values: LoginFormValues) {
    console.log('登录表单提交:', values);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      message.info('登录成功！');
      navigate({ to: '/' });
    }, 2000);
  }

  function onRefreshCaptcha() {
    console.log('刷新验证码图片 URL');
  }

  return (
    <Form form={form} layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input prefix={<UserOutlined />} placeholder="用户名" autoComplete="username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password prefix={<LockOutlined />} placeholder="密码" autoComplete="current-password" />
      </Form.Item>

      <Form.Item>
        <Flex gap={token.marginSM}>
          <Form.Item name="captcha" noStyle={true} rules={[{ required: true, message: '请输入验证码' }]}>
            <Input prefix={<SafetyCertificateOutlined />} placeholder="验证码" style={{ flex: 1 }} />
          </Form.Item>
          <Image
            src=""
            alt="验证码"
            onClick={onRefreshCaptcha}
            title="点击刷新验证码"
            preview={false}
            placeholder={
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 70,
                  height: token.controlHeight,
                  backgroundColor: token.colorPrimaryBg,
                  borderRadius: token.borderRadius,
                }}
              >
                <PictureOutlined style={{ fontSize: 20, color: token.colorPrimaryBg }} />
              </Flex>
            }
            fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='32'%3E%3C/svg%3E"
            style={{
              width: 70,
              cursor: 'pointer',
              backgroundColor: token.colorPrimaryBg,
              height: token.controlHeight,
              borderRadius: token.borderRadius,
            }}
          />
        </Flex>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block={true} loading={loading} disabled={loading}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
}
