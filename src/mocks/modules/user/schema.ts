import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  nickname: z.string(),
  email: z.email(),
  avatar: z.url(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;
