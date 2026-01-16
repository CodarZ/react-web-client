import { faker } from '@faker-js/faker/locale/zh_CN';

import type { LoginResponse, User, UserRole } from './schema';

// ============================================================
// Mock 数据生成工厂
// ============================================================

/**
 * 生成单个用户 Mock 数据
 */
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: faker.number.int({ min: 1, max: 10000 }),
  username: faker.internet.username(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  role: faker.helpers.arrayElement(['admin', 'user', 'guest'] as UserRole[]),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

/**
 * 生成用户列表 Mock 数据
 */
export const createMockUserList = (count = 10): User[] => Array.from({ length: count }, () => createMockUser());

/**
 * 生成登录响应 Mock 数据
 */
export const createMockLoginResponse = (overrides?: Partial<LoginResponse>): LoginResponse => ({
  user: createMockUser(),
  token: faker.string.alphanumeric(64),
  expiresAt: faker.date.future().toISOString(),
  ...overrides,
});

/**
 * 预设用户数据（用于登录模拟）
 */
export const MOCK_USERS = {
  admin: createMockUser({
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
  }),
  user: createMockUser({
    id: 2,
    username: 'user',
    email: 'user@example.com',
    role: 'user',
  }),
  guest: createMockUser({
    id: 3,
    username: 'guest',
    email: 'guest@example.com',
    role: 'guest',
  }),
};
