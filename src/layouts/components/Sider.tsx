import { useRouter, useRouterState } from '@tanstack/react-router';

import { DesktopOutlined } from '@ant-design/icons';
import { Drawer, Flex, Grid, Layout, Menu, type MenuProps, theme } from 'antd';

const { Sider: AntSider } = Layout;

// Sider 尺寸配置
const SIDER_CONFIG = {
  width: 200,
  collapsedWidth: 80,
  logoPaddingInline: 16,
  logoSize: 30,
};

interface SiderProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  drawerVisible: boolean;
  onDrawerVisibleChange: (visible: boolean) => void;
}

export function Sider({ collapsed, onCollapsedChange, drawerVisible, onDrawerVisibleChange }: SiderProps) {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      {/* 桌面端侧边栏 */}
      <AntSider
        theme="light"
        breakpoint="lg"
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        width={SIDER_CONFIG.width}
        collapsedWidth={isMobile ? 0 : SIDER_CONFIG.collapsedWidth}
        onBreakpoint={(broken) => onCollapsedChange(broken)}
        style={{
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <SiderContent collapsed={collapsed} />
      </AntSider>

      {/* 移动端抽屉 */}
      <Drawer
        placement="left"
        onClose={() => onDrawerVisibleChange(false)}
        open={isMobile && drawerVisible}
        styles={{ body: { padding: 0, background: token.colorBgContainer } }}
        size={SIDER_CONFIG.width}
        closable={false}
      >
        <SiderContent onItemClick={() => onDrawerVisibleChange(false)} />
      </Drawer>
    </>
  );
}

export function SiderContent(props: { collapsed?: boolean; onItemClick?: () => void }) {
  const { collapsed = false, onItemClick } = props;

  const { token } = theme.useToken();
  const router = useRouter();
  const { matches } = useRouterState();

  const activeKey = matches[matches.length - 1]?.routeId;

  const menuItems: MenuProps['items'] = [
    {
      key: '/_authenticated/',
      icon: <DesktopOutlined />,
      label: '首页',
      title: '首页',
      onClick: () => {
        router.navigate({ to: '/' });
        onItemClick?.();
      },
    },
  ];

  return (
    <>
      <SiderLogo collapsed={collapsed} />

      <div
        style={{
          height: `calc(100vh - ${token.Layout?.headerHeight || 64}px)`,
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        <Menu
          mode="inline"
          style={{ height: '100%', border: 'none' }}
          selectedKeys={activeKey ? [activeKey] : []}
          items={menuItems}
        />
      </div>
    </>
  );
}

/** 侧边栏 Logo 组件 */
export function SiderLogo(props: { collapsed: boolean }) {
  const { collapsed } = props;

  const { token } = theme.useToken();
  const router = useRouter();

  // 收起时 Logo 居中需要的平移量
  const logoTranslateX = (SIDER_CONFIG.collapsedWidth - SIDER_CONFIG.logoPaddingInline * 2 - SIDER_CONFIG.logoSize) / 2;

  return (
    <Flex
      align="center"
      style={{
        height: token.Layout?.headerHeight || 64,
        paddingInline: SIDER_CONFIG.logoPaddingInline,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => router.navigate({ to: '/' })}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          flexShrink: 0,
          width: SIDER_CONFIG.logoSize,
          height: SIDER_CONFIG.logoSize,
          transform: collapsed ? `translateX(${logoTranslateX}px) scale(1.25)` : 'translateX(0) scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }}
      >
        <img src="/logo.svg" alt="Logo" style={{ width: '100%', height: '100%' }} />
      </Flex>

      <span
        style={{
          marginInlineStart: 10,
          flex: 'auto',
          minWidth: 0,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }}
      >
        React Web Client
      </span>
    </Flex>
  );
}
