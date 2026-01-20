import { faker } from '@faker-js/faker';

import { type User, UserSchema } from './schema';

export const fakeUser = (overrides?: Partial<User>): User => {
  const data = {
    id: faker.number.int({ min: 1, max: 999999 }),
    username: faker.internet.username(),
    nickname: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    roles: faker.helpers.arrayElements(['admin', 'user', 'guest'], { min: 1, max: 2 }),
    permissions: faker.helpers.arrayElements(['read', 'write', 'delete', 'manage'], { min: 1, max: 3 }),
    ...overrides,
  };

  return UserSchema.parse(data);
};

/** 生成一组模拟用户 */
export const fakeUsers = (count = 10): User[] => {
  return Array.from({ length: count }, () => fakeUser());
};
