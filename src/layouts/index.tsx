import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';

import { Grid, Layout, theme } from 'antd';

import { Header } from './components/Header';
import { Sider } from './components/Sider';

const { Content } = Layout;

export function BaseLayout() {
  const { token } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  // 统一处理侧边栏切换
  const onToggleCollapse = () => {
    if (isMobile) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        drawerVisible={drawerVisible}
        onDrawerVisibleChange={setDrawerVisible}
      />

      <Layout style={{ position: 'relative', overflow: 'hidden' }}>
        <Header collapsed={isMobile ? !drawerVisible : collapsed} onToggleCollapse={onToggleCollapse} />
        <Content
          style={{
            padding: token.padding,
            height: '100vh',
            overflow: 'auto',
            paddingTop: Number(token.Layout?.headerHeight || 64) + token.padding,
            marginTop: -Number(token.Layout?.headerHeight || 64),
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
