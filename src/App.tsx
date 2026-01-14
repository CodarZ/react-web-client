import { RouterProvider } from '@tanstack/react-router';

import { App as AntdApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { router } from '@/routes/-index';

import { useDeviceDarkTheme } from './hooks/useDeviceDarkTheme';
import { AntdStaticProvider } from './libs/antd-static';
import { useAppStore } from './stores/useAppStore';

export default function App() {
  const { token } = theme.useToken();
  const appState = useAppStore();
  const prefersDark = useDeviceDarkTheme();

  const isDark = appState.themeMode === 'auto' ? prefersDark : appState.themeMode === 'dark';

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: appState.colorPrimary,
        },
        components: {
          Layout: {
            headerHeight: 64,
            headerBg: token.colorBgContainer,
          },
        },
      }}
    >
      <AntdApp message={{ maxCount: 3 }} notification={{ maxCount: 3 }}>
        <AntdStaticProvider />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}
