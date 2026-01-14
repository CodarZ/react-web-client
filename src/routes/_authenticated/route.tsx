import { createFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/layouts';

export const Route = createFileRoute('/_authenticated')({
  component: BaseLayout,
});
