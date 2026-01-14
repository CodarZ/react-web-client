import { useEffect, useState } from 'react';

const DEFAULT_QUERY = '(prefers-color-scheme: dark)';

/**
 * 监听设备当前主题
 * @returns {boolean} 系统是否是深色模式
 */
export function useDeviceDarkTheme() {
  const [prefersDark, setPrefersDark] = useState(() => {
    if (typeof window === 'undefined') return false; // 兼容 SSR
    return window.matchMedia(DEFAULT_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(DEFAULT_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersDark;
}
