import type { RequestHandler } from 'msw';

import { MockModules } from '../config';

/** 所有启用的 handlers */
export const handlers: RequestHandler[] = loadEnabledHandlers();

/** 依据 `../config.ts` 自动处理 handlers */
function loadEnabledHandlers(): RequestHandler[] {
  const allFileModules = import.meta.glob<Record<string, any>>('./*.ts', { eager: true });
  const allDirModules = import.meta.glob<Record<string, any>>('./*/index.ts', { eager: true });
  const handlers: RequestHandler[] = [];

  for (const config of MockModules) {
    if (config.enabled) {
      // 1. 优先加载配置中直接定义的 handlers (如 Orval 生成的)
      if (Array.isArray(config.handlers) && config.handlers.length > 0) {
        handlers.push(...config.handlers);
      }

      // 2. 尝试加载文件定义的 handlers (手动编写的)
      const filePath = `./${config.name}.ts`;
      const dirPath = `./${config.name}/index.ts`;
      const module = allFileModules[filePath] || allDirModules[dirPath];

      if (module) {
        const moduleHandlers = getModuleHandlers(module, config.name);

        if (Array.isArray(moduleHandlers)) {
          handlers.push(...moduleHandlers);
        } else {
          // 如果没有配置 handlers, 且文件中也没有, 则警告
          if (!config.handlers) {
            console.warn(
              `[MSW] 模块 "${config.name}" 已启用, 但在 "${module === allFileModules[filePath] ? filePath : dirPath}" 中找不到有效的 handlers 导出`,
            );
          }
        }
      } else {
        // 如果没有配置 handlers, 且也没找到文件, 则警告
        if (!config.handlers) {
          console.warn(`[MSW] 配置了模块 "${config.name}", 但找不到对应的文件 ${filePath} 或 ${dirPath}`);
        }
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
