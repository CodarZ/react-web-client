import { MockModules } from '../config';

/** 检查模块是否启用 Mock */
export function isModuleMockEnabled(name: string) {
  const module = MockModules.find((_) => _.name === name);
  return module?.enabled ?? false;
}

/** 根据请求路径判断是否应该 mock */
export function isShouldMock(path: string) {
  return MockModules.some((_) => _.enabled && _.pathPrefixes.some((__) => path.startsWith(__)));
}

/** 获取所有 启用 mock 的模块名 */
export function getMockEnabledModules() {
  return MockModules.filter((_) => _.enabled).map((_) => _.name);
}

/** 根据请求路径获取 mock 模块配置 */
export function getModuleMockConfig(path: string) {
  return MockModules.find((_) => _.pathPrefixes.some((__) => path.startsWith(__)));
}
