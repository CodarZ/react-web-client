import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface AppState {
  /** 主题模式：浅色 / 深色 / 跟随系统 */
  themeMode: ThemeMode;
}

interface AppActions {
  /** 设置主题 */
  setThemeMode: (mode: ThemeMode) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      themeMode: 'auto',

      setThemeMode: (mode) => set({ themeMode: mode }),
    }),
    {
      name: 'app',
    },
  ),
);
