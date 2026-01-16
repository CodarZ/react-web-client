import { faker } from '@faker-js/faker/locale/zh_CN';

// 设置随机种子以获得可重复的结果（开发调试时有用）
// faker.seed(123);

/**
 * 生成指定范围的随机延迟（毫秒）
 */
export const randomDelay = (min = 100, max = 500): number => faker.number.int({ min, max });

/**
 * 生成分页响应数据
 */
export const createPaginatedData = <T>(items: T[], pageNum: number, pageSize: number, total?: number) => {
  const actualTotal = total ?? items.length;
  const startIndex = (pageNum - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);

  return {
    total: actualTotal,
    rows: paginatedItems,
    pageSize,
    pageNum,
  };
};

/**
 * 生成标准 API 响应结构
 */
export const createApiResponse = <T>(data: T, success = true, msg = 'success') => ({
  code: success ? 0 : -1,
  msg: success ? msg : 'error',
  data,
});

/**
 * 生成错误响应
 */
export const createErrorResponse = (code: number, msg: string) => ({
  code,
  msg,
  data: null,
});

/**
 * 导出 faker 实例供各模块使用
 */
export { faker };
