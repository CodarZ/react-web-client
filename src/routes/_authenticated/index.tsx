import { createFileRoute } from '@tanstack/react-router';

import HomePage from '@/views/home/index';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
});
