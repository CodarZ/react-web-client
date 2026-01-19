import { QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 重试
      retry: (failureCount) => {
        if (failureCount >= 0 && import.meta.env.DEV) return false;
        if (failureCount > 3 && import.meta.env.PROD) return false;

        return false;
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000,
    },
    mutations: {
      onError: () => {
        // 处理错误
      },
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      // 处理错误
    },
  }),
});

export default queryClient;
