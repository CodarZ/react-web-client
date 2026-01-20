import { faker } from '@faker-js/faker';

import type { User } from '../user/schema';

export const fakeUserInfo = (username: string): User => {
  return {
    id: 1,
    username,
    email: faker.internet.email(),
    nickname: faker.person.fullName(),
    avatar: faker.image.avatar(),
    roles: ['admin'],
    permissions: ['*'],
  };
};

export const fakeToken = () => `mock-token-${faker.string.uuid()}`;
