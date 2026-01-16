import type { RequestHandler } from 'msw';

import { MockModules } from '../config';

/** 所有启用的 handlers */
export const handlers: RequestHandler[] = loadEnabledHandlers();

/**
 * 依据 `../config.ts` 自动处理获取 handlers
 *
 * 约定：
 *  - name 与 文件名一致
 *  - 导出名称为 [name]Handlers 或 handlers
 */
function loadEnabledHandlers(): RequestHandler[] {
  const allModules = import.meta.glob<Record<string, any>>('./*.ts', { eager: true });
  const handlers: RequestHandler[] = [];

  for (const config of MockModules) {
    if (config.enabled) {
      const path = `./${config.name}.ts`;
      const module = allModules[path];

      if (module) {
        const moduleHandlers = module[`${config.name}Handlers`] || module.handlers;
        if (Array.isArray(moduleHandlers)) {
          handlers.push(...moduleHandlers);
        } else {
          console.warn(
            `[MSW] 模块 "${config.name}" 已启用, 但在 ${path} 中无约定的 handlers 或 ${config.name}Handlers 导出`,
          );
        }
      } else {
        console.warn(`[MSW] 配置了模块 "${config.name}", 但找不到对应的文件 ${path}`);
      }
    }
  }

  return handlers;
}
