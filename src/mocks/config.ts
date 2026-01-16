/**
 * Mock 模块配置
 *
 * 控制部分模块启用 Mock, 实现"部分 Mock + 部分线上"的混合模式
 *
 * 设计思路:
 * 1. VITE_USE_MOCK 环境变量作为**总开关**
 *    - 如果为 false, 则完全不启动 MSW, 所有请求走真实 API
 *    - 如果为 true, 则启动 MSW, 并根据下面的模块配置决定哪些模块使用 Mock
 *
 * 2. MockModules 配置作为**模块级开关**
 *    - 即使 MSW 启动了, 也只拦截配置为 enabled: true 的模块
 *    - 配置为 enabled: false 的模块请求会被 bypass, 走真实 API
 *
 * 3. skipMock 请求配置作为**接口级开关**
 *    - 自定义增强 AxiosRequestConfig
 *    - 在 ExtendedAxiosRequestConfig 中可以设置 skipMock: true
 *    - 这样即使该模块启用了 Mock, 该请求也会走真实 API
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

/** Mock 模块配置列表 */
export const MockModules: MockModuleConfig[] = [
  {
    name: 'user',
    enabled: true,
    pathPrefixes: ['/user'],
    description: '用户信息模块',
  },
  {
    name: 'auth',
    enabled: true,
    pathPrefixes: ['/auth'],
    description: '认证模块',
  },
];
