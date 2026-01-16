import { setupWorker } from 'msw/browser';

import { handlers } from './modules';

/**
 * 创建 MSW 浏览器 Worker
 */
export const worker = setupWorker(...handlers);

/**
 * 启动 Mock Service Worker
 *
 * @param options - 配置选项
 */
export const startMockServiceWorker = async (options?: Parameters<typeof worker.start>[0]) => {
  return worker.start({
    // 未匹配的请求直接放行到真实 API
    onUnhandledRequest: 'bypass',
    // 开发环境显示 MSW 日志
    quiet: false,
    ...options,
  });
};
