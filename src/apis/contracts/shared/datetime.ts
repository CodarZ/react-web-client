import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

// ============================================================
// 日期时间 Schema 定义 (Zod 4.x 语法)
// ============================================================

/**
 * ISO 日期时间字符串 Schema（不转换）
 *
 * 用于 Mock 数据和原始 API 响应类型
 */
export const ISODateTimeStringSchema = z.iso.datetime({
  message: '无效的日期时间格式，应为 ISO 8601 格式',
});

/**
 * ISO 日期时间字符串 Schema（转换为 dayjs）
 *
 * 输入: ISO 8601 格式字符串
 * 输出: dayjs 对象
 */
export const DateTimeSchema = z.iso
  .datetime({ message: '无效的日期时间格式，应为 ISO 8601 格式' })
  .transform((val) => dayjs(val));

/**
 * 仅日期 Schema (YYYY-MM-DD)
 */
export const DateOnlySchema = z.iso
  .date({ message: '日期格式应为 YYYY-MM-DD' })
  .transform((val) => dayjs(val, 'YYYY-MM-DD'));

/**
 * 可选日期时间 Schema（转换为 dayjs）
 */
export const OptionalDateTimeSchema = z.iso
  .datetime()
  .optional()
  .nullable()
  .transform((val) => (val ? dayjs(val) : undefined));

/**
 * 可选日期时间 Schema（不转换，用于 Mock）
 */
export const OptionalISODateTimeStringSchema = z.iso.datetime().optional().nullable();

/**
 * 时间戳 Schema (毫秒)
 */
export const TimestampSchema = z
  .number()
  .int()
  .positive()
  .transform((val) => dayjs(val));

/**
 * 时间戳 Schema (秒)
 */
export const TimestampSecondsSchema = z
  .number()
  .int()
  .positive()
  .transform((val) => dayjs.unix(val));

/**
 * 日期范围 Schema
 */
export const DateRangeSchema = z
  .object({
    start: DateTimeSchema,
    end: DateTimeSchema,
  })
  .refine((data) => data.start.isBefore(data.end), {
    message: '开始时间必须早于结束时间',
  });

/**
 * 灵活日期 Schema - 支持字符串或时间戳
 */
export const FlexibleDateSchema = z
  .union([z.iso.datetime(), z.iso.date(), z.number().int().positive()])
  .transform((val) => {
    if (typeof val === 'number') {
      // 判断是秒还是毫秒（13位为毫秒）
      return val.toString().length === 13 ? dayjs(val) : dayjs.unix(val);
    }
    return dayjs(val);
  });

// ============================================================
// 格式化工具函数
// ============================================================

/**
 * 格式化 dayjs 对象为 ISO 字符串（用于发送请求）
 */
export const formatToISO = (date: Dayjs): string => date.toISOString();

/**
 * 格式化 dayjs 对象为日期字符串（用于显示）
 */
export const formatToDate = (date: Dayjs, format = 'YYYY-MM-DD'): string => date.format(format);

/**
 * 格式化 dayjs 对象为日期时间字符串（用于显示）
 */
export const formatToDateTime = (date: Dayjs, format = 'YYYY-MM-DD HH:mm:ss'): string => date.format(format);

/**
 * 格式化 dayjs 对象为时间戳（毫秒）
 */
export const formatToTimestamp = (date: Dayjs): number => date.valueOf();

/**
 * 格式化 dayjs 对象为时间戳（秒）
 */
export const formatToUnix = (date: Dayjs): number => date.unix();

/**
 * 格式化相对时间（如：3 分钟前）
 */
export const formatToRelative = (date: Dayjs): string => {
  const now = dayjs();
  const diffSeconds = now.diff(date, 'second');

  if (diffSeconds < 60) return '刚刚';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} 分钟前`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} 小时前`;
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)} 天前`;

  return date.format('YYYY-MM-DD');
};
