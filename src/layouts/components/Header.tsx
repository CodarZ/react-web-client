import { useNavigate } from '@tanstack/react-router';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Flex, Layout, theme, Typography, type MenuProps } from 'antd';

import { Route as LoginRoute } from '@/routes/(auth)/login';

import { message, modal } from '@/libs/antd-static';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

/** 头部导航栏组件 */
export function Header(props: { collapsed: boolean; onToggleCollapse: () => void }) {
  const { collapsed, onToggleCollapse } = props;

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex vertical={true} style={{ cursor: 'default' }} onClick={(e) => e.preventDefault()}>
          <Text strong={true}>超级管理员</Text>
          <Text style={{ width: 130 }} type="secondary" ellipsis={true}>
            admin@react-web-client
          </Text>
        </Flex>
      ),
      disabled: true,
    },
    { type: 'divider' },
    { key: '2', label: '个人信息', onClick: () => message.warning('正在开发中') },
    { key: '3', label: '账户管理', onClick: () => message.warning('正在开发中') },
    { type: 'divider' },
    { key: '4', label: '退出登录', danger: true, icon: <LogoutOutlined />, onClick: onLogout },
  ];

  async function onLogout() {
    modal.confirm({
      title: '退出登录',
      content: '您确定要退出登录吗？您需要重新登录才能访问您的帐户。',
      centered: true,
      maskClosable: true,
      onOk: async () => {
        const hide = message.loading('正在退出...', 0);

        try {
          // 发送请求、清理状态、清理缓存
          await new Promise((resolve) => setTimeout(resolve, 1000));
          hide();
          message.success('退出成功');
          navigate({ to: LoginRoute.to, replace: true });
        } catch {
          hide();
          message.error('退出失败，请稍后重试！');
        }
      },
    });
  }

  return (
    <AntHeader
      style={{
        padding: 0,
        background: `color-mix(in srgb, ${token.colorBgContainer}, transparent 40%)`,
        backdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
        borderBottom: `1px solid ${token.colorSplit}`,
        position: 'sticky',
        top: 0,
        zIndex: token.zIndexPopupBase - 10,
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
      }}
    >
      <Flex align="center" justify="space-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{
            height: token.Layout?.headerHeight || 64,
            width: token.Layout?.headerHeight || 64,
            fontSize: token.fontSizeLG,
          }}
        />

        <Flex gap={token.padding} style={{ paddingRight: token.padding }}>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
            styles={{
              root: {
                width: 160,
              },
            }}
          >
            <Avatar size={32} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Flex>
      </Flex>
    </AntHeader>
  );
}
