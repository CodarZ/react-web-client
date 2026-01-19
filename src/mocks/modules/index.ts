import type { RequestHandler } from 'msw';

import { MockModules } from '../config';

/** 所有启用的 handlers */
export const handlers: RequestHandler[] = loadEnabledHandlers();

/** 依据 `../config.ts` 自动处理 handlers */
function loadEnabledHandlers(): RequestHandler[] {
  const allModules = import.meta.glob<Record<string, any>>('./*.ts', { eager: true });
  const handlers: RequestHandler[] = [];

  for (const config of MockModules) {
    if (config.enabled) {
      const path = `./${config.name}.ts`;
      const module = allModules[path];

      if (module) {
        const moduleHandlers = getModuleHandlers(module, config.name);

        if (Array.isArray(moduleHandlers)) {
          handlers.push(...moduleHandlers);
        } else {
          console.warn(`[MSW] 模块 "${config.name}" 已启用, 但在 ${path} 中找不到有效的 handlers 导出`);
        }
      } else {
        console.warn(`[MSW] 配置了模块 "${config.name}", 但找不到对应的文件 ${path}`);
      }
    }
  }

  return handlers;
}

/**
 * 解析模块中的 handlers
 * 优先级:
 *   1. 默认导出 (export default)
 *   2. 命名导出 handlers (export const handlers)
 *   3. 约定命名导出 (export const [name]Handlers)
 *
 * 注意:
 *   - 将文件名短横线命名转换为小驼峰命名
 */
function getModuleHandlers(module: Record<string, any>, name: string): RequestHandler[] | undefined {
  if (Array.isArray(module.default)) return module.default;

  if (Array.isArray(module.handlers)) return module.handlers;

  const camelCaseName = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  const expectedName = `${camelCaseName}Handlers`;
  if (Array.isArray(module[expectedName])) return module[expectedName];

  return undefined;
}
