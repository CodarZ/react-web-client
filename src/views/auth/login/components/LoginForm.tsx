import { useNavigate } from '@tanstack/react-router';
import { useRef, useState } from 'react';

import { LockOutlined, PictureOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Image, Input, Spin, theme } from 'antd';

import { useMount } from 'ahooks';

import { getCaptchaApi, useLogin } from '@/apis';

import { message } from '@/libs/antd-static';

interface LoginFormValues {
  username: string;
  password: string;
  captcha: string;
  remember: boolean;
}

export default function LoginForm() {
  const { mutate: login, isPending: loading } = useLogin();
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaUrl, setCaptchaUrl] = useState<string | null>(null);
  const [form] = Form.useForm<LoginFormValues>();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const fetchedRef = useRef(false);

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const data = await getCaptchaApi();
      setCaptchaUrl(data);
    } catch (err) {
      console.error('获取验证码失败:', err);
    } finally {
      setCaptchaLoading(false);
    }
  };

  useMount(() => {
    if (!fetchedRef.current) {
      fetchCaptcha();
      fetchedRef.current = true;
    }
  });

  function onFinish(values: LoginFormValues) {
    console.log('登录表单提交:', values);

    login(values, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo));

        message.success('登录成功！');
        navigate({ to: '/' });
      },
      onError: (err) => {
        message.error(err.message || '登录失败');
        // 登录失败通常需要刷新验证码
        fetchCaptcha();
      },
    });
  }

  function onRefreshCaptcha() {
    fetchCaptcha();
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
          <Spin spinning={captchaLoading} size="small">
            <Image
              src={captchaUrl || undefined}
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
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
          </Spin>
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
