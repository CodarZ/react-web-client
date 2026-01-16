/**
 * Mock 模块配置
 *
 * 控制哪些模块启用 Mock，实现"部分 Mock + 部分线上"的混合模式
 *
 * 设计思路（解决环境变量与部分 Mock 的冲突）：
 * 1. VITE_USE_MOCK 环境变量作为**总开关**
 *    - 如果为 false，则完全不启动 MSW，所有请求走真实 API
 *    - 如果为 true，则启动 MSW，并根据下面的模块配置决定哪些模块使用 Mock
 *
 * 2. mockModules 配置作为**模块级开关**
 *    - 即使 MSW 启动了，也只拦截配置为 enabled: true 的模块
 *    - 配置为 enabled: false 的模块请求会被 bypass，走真实 API
 *
 * 3. skipMock 请求配置作为**接口级开关**
 *    - 在 ExtendedAxiosRequestConfig 中可以设置 skipMock: true
 *    - 这样即使该模块启用了 Mock，该请求也会走真实 API
 */

export interface MockModuleConfig {
  /** 模块名称（需与 modules 目录下的文件名对应） */
  name: string;
  /** 是否启用 Mock */
  enabled: boolean;
  /** 需要 Mock 的路径前缀（用于精确匹配） */
  pathPrefixes: string[];
  /** 备注说明 */
  description?: string;
}

/**
 * Mock 模块配置列表
 *
 * 在这里配置每个业务模块是否启用 Mock
 * enabled: true  - 使用 Mock 数据
 * enabled: false - 使用真实 API
 */
export const mockModules: MockModuleConfig[] = [
  {
    name: 'user',
    enabled: true,
    pathPrefixes: ['/users', '/auth'],
    description: '用户模块 - 登录、用户列表等',
  },
  {
    name: 'product',
    enabled: false,
    pathPrefixes: ['/products', '/categories'],
    description: '产品模块 - 使用线上真实数据',
  },
  // TODO: 添加更多模块配置...
];

/**
 * 检查模块是否启用 Mock
 */
export const isModuleMockEnabled = (moduleName: string): boolean => {
  const module = mockModules.find((m) => m.name === moduleName);
  return module?.enabled ?? false;
};

/**
 * 获取所有启用 Mock 的模块名称
 */
export const getEnabledMockModules = (): string[] => {
  return mockModules.filter((m) => m.enabled).map((m) => m.name);
};

/**
 * 根据请求路径判断是否应该被 Mock
 *
 * 用于在 MSW handler 中进行更精细的控制
 */
export const shouldMockPath = (path: string): boolean => {
  return mockModules.some((m) => m.enabled && m.pathPrefixes.some((prefix) => path.startsWith(prefix)));
};

/**
 * 获取某个路径对应的模块配置
 */
export const getModuleByPath = (path: string): MockModuleConfig | undefined => {
  return mockModules.find((m) => m.pathPrefixes.some((prefix) => path.startsWith(prefix)));
};
