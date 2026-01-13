import { RouterProvider } from '@tanstack/react-router';

import { App as AntdApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { router } from '@/routes/-index';

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {},
        components: {
          Layout: {
            headerHeight: 64,
          },
        },
      }}
    >
      <AntdApp message={{ maxCount: 3 }} notification={{ maxCount: 3 }}>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}
