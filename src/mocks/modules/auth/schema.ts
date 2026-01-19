import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().optional(),
});

export const UserInfoSchema = z.object({
  id: z.number(),
  username: z.string(),
  nickname: z.string(),
  avatar: z.url(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export const TokenSchema = z.object({
  token: z.string(),
  userInfo: UserInfoSchema,
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type TokenResponse = z.infer<typeof TokenSchema>;
