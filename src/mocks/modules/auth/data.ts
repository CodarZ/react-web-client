import { faker } from '@faker-js/faker';

import type { UserInfo } from './schema';

export const fakeUserInfo = (username: string): UserInfo => {
  return {
    id: 1,
    username,
    nickname: faker.person.fullName(),
    avatar: faker.image.avatar(),
    roles: ['admin'],
    permissions: ['*'],
  };
};

export const fakeToken = () => `mock-token-${faker.string.uuid()}`;
