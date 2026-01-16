import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import {
  CheckOutlined,
  DesktopOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  ReloadOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  Layout,
  theme,
  Tooltip,
  Typography,
  type MenuProps,
} from 'antd';

import { Route as LoginRoute } from '@/routes/(auth)/login';

import { useDeviceDarkTheme } from '@/hooks/useDeviceDarkTheme';
import { message, modal } from '@/libs/antd-static';
import { useAppStore, type ThemeMode } from '@/stores/useAppStore';

import { logoutApi } from '@/apis/auth';

import autoSvg from '../assets/theme/auto.svg';
import darkSvg from '../assets/theme/dark.svg';
import lightSvg from '../assets/theme/light.svg';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const themeOptions = [
  { key: 'light', label: '浅色', icon: <SunOutlined />, svg: lightSvg },
  { key: 'dark', label: '深色', icon: <MoonOutlined />, svg: darkSvg },
  { key: 'auto', label: '跟随设备', icon: <DesktopOutlined />, svg: autoSvg },
];

/** 头部导航栏组件 */
export function Header(props: { collapsed: boolean; onToggleCollapse: () => void }) {
  const { collapsed, onToggleCollapse } = props;

  const { token } = theme.useToken();
  const navigate = useNavigate();

  const appState = useAppStore();
  const prefersDark = useDeviceDarkTheme();

  const isDark = appState.themeMode === 'auto' ? prefersDark : appState.themeMode === 'dark';

  const [settingsDrawer, setSettingsDrawer] = useState(false);

  const userInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo') || '{}');
    } catch {
      return {};
    }
  })();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex vertical={true} style={{ cursor: 'default' }} onClick={(e) => e.preventDefault()}>
          <Text strong={true}>{userInfo.nickname || '未登录'}</Text>
          <Text style={{ width: 130 }} type="secondary" ellipsis={true}>
            {userInfo.username || 'user'}
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
          await logoutApi();
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
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
    <>
      <AntHeader
        style={{
          padding: 0,
          background: token.colorBgContainer,
          backdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
          WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(1.1)',
          borderBottom: `1px solid ${token.colorSplit}`,
          position: 'sticky',
          top: 0,
          zIndex: token.zIndexPopupBase - 10,
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
              trigger={['click']}
              placement="bottomRight"
              styles={{ root: { width: 150 } }}
              menu={{
                selectable: true,
                selectedKeys: [appState.themeMode],
                onSelect: (e) => appState.setThemeMode(e.key as ThemeMode),
                items: themeOptions,
              }}
            >
              <Button type="text" icon={isDark ? <MoonOutlined /> : <SunOutlined />} />
            </Dropdown>

            <Button type="text" icon={<SettingOutlined />} onClick={() => setSettingsDrawer(true)} />

            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} styles={{ root: { width: 160 } }}>
              <Avatar size={32} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </Flex>
        </Flex>
      </AntHeader>

      <SettingsDrawer open={settingsDrawer} onClose={() => setSettingsDrawer(false)} />
    </>
  );
}

function SettingsDrawer(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  const { token } = theme.useToken();
  const appState = useAppStore();

  const primaryColors = ['#165dff', '#722ed1', '#2f54eb', '#f5222d', '#fe6637', '#13c2c2', '#52c41a'];

  return (
    <Drawer
      title={
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong={true}>系统配置</Text>
          <Tooltip title="重置设置">
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined style={{ fontSize: 12 }} />}
              onClick={() => appState.resetAppState()}
            />
          </Tooltip>
        </Flex>
      }
      placement="right"
      onClose={onClose}
      open={open}
      styles={{ body: { background: token.colorBgContainer } }}
      closable={true}
      size={340}
    >
      <Flex vertical={true} gap={24}>
        <section>
          <Text strong={true} style={{ display: 'block', marginBottom: 16 }}>
            主题模式
          </Text>

          <Flex gap={12} justify="space-between">
            {themeOptions.map((opt) => {
              const isActive = appState.themeMode === opt.key;
              return (
                <Flex
                  key={opt.key}
                  vertical={true}
                  align="center"
                  gap={8}
                  style={{ flex: 1, cursor: 'pointer', position: 'relative' }}
                  onClick={() => appState.setThemeMode(opt.key as ThemeMode)}
                >
                  <Card
                    hoverable={true}
                    styles={{ body: { padding: 4 } }}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      border: isActive ? `2px solid ${token.colorPrimary}` : `2px solid transparent`,
                      backgroundColor: token.colorFillAlter,
                      overflow: 'hidden',
                    }}
                  >
                    <img src={opt.svg} alt={opt.label} style={{ width: '100%', display: 'block' }} />
                  </Card>
                  <Text style={{ fontSize: token.fontSizeSM }} type={isActive ? undefined : 'secondary'}>
                    {opt.label}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </section>

        <Divider style={{ margin: 0 }} />

        {/* 主题色 */}
        <section>
          <Text strong={true} style={{ display: 'block', marginBottom: 16 }}>
            主题色
          </Text>
          <Flex wrap="wrap" gap={8}>
            {primaryColors.map((color) => {
              const isActive = appState.colorPrimary === color;
              return (
                <Tooltip key={color} title={color}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: color,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onClick={() => appState.setColorPrimary(color)}
                  >
                    {isActive && <CheckOutlined style={{ fontSize: 12 }} />}
                  </div>
                </Tooltip>
              );
            })}
          </Flex>
        </section>
      </Flex>
    </Drawer>
  );
}
