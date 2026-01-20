import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import LoginPage from '@/views/auth/login';

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginPage,
});
