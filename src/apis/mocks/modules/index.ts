import type { RequestHandler } from 'msw';

import { isModuleMockEnabled } from '../config';
import { userHandlers } from './user';

/**
 * 根据配置动态加载 Mock Handlers
 *
 * 只加载配置为 enabled: true 的模块的 handlers
 */
const loadEnabledHandlers = (): RequestHandler[] => {
  const handlers: RequestHandler[] = [];

  // 用户模块
  if (isModuleMockEnabled('user')) {
    handlers.push(...userHandlers);
  }

  // 产品模块（示例）
  // if (isModuleMockEnabled('product')) {
  //   handlers.push(...productHandlers);
  // }

  // TODO: 添加更多模块...

  return handlers;
};

/**
 * 导出所有启用的 handlers
 */
export const handlers: RequestHandler[] = loadEnabledHandlers();
