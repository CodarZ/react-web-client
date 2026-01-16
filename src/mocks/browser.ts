import { setupWorker } from 'msw/browser';

import { handlers } from './modules';

/** 创建 MSW 浏览器 Worker */
export const worker = setupWorker(...handlers);

/** 启动 Mock Service Worker */
export async function startMockServiceWorker(options?: Parameters<typeof worker.start>[0]) {
  return worker.start({
    onUnhandledRequest: 'bypass',
    quiet: false,
    ...options,
  });
}
