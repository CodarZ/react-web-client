import { createFileRoute, redirect } from '@tanstack/react-router';

import { BaseLayout } from '@/layouts';

import { useUserStore } from '@/stores/useUserStore';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const isLogged = !!useUserStore.getState().token;
    if (!isLogged) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  component: BaseLayout,
});
