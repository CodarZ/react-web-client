import { z } from 'zod';

import { UserSchema, type User } from '../user/schema';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().optional(),
});

export const TokenSchema = z.object({
  token: z.string(),
  userInfo: UserSchema,
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type UserInfo = User;
export type TokenResponse = z.infer<typeof TokenSchema>;
