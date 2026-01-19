import { faker } from '@faker-js/faker';

import { type User, UserSchema } from './schema';

export const fakeUser = (overrides?: Partial<User>): User => {
  const data = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'user', 'guest'] as const),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };

  return UserSchema.parse(data);
};

/** 生成一组模拟用户 */
export const fakeUsers = (count = 10): User[] => {
  return Array.from({ length: count }, () => fakeUser());
};
