import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import App from './App.tsx';
import './styles/index.css';

dayjs.locale('zh-cn');

async function stupApp() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true') {
    const { startMockServiceWorker, getEnabledMockModules } = await import('@/apis/mocks');
    await startMockServiceWorker({ onUnhandledRequest: 'bypass' });

    const enabledModules = getEnabledMockModules();
    console.log('[MSW] Mock Service Worker 已启动');
    console.log('[MSW] 启用 Mock 的模块:', enabledModules.join(', ') || '无');
  }

  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

stupApp();
