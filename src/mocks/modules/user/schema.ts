import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email().optional(),
  avatar: z.url().optional(),
  role: z.enum(['admin', 'user', 'guest']).default('user'),
  updatedAt: z.iso.datetime(),
});

export type User = z.infer<typeof UserSchema>;
