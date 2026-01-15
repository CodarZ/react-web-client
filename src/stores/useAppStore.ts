import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface AppState {
  /** 主题模式：浅色 / 深色 / 跟随系统 */
  themeMode: ThemeMode;
  /** 主题色 */
  colorPrimary: string;
}

interface AppActions {
  /** 设置主题 */
  setThemeMode: (mode: ThemeMode) => void;
  /** 设置主题色 */
  setColorPrimary: (color: string) => void;
  /** 重置应用状态 */
  resetAppState: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      themeMode: 'auto',
      colorPrimary: '#722ed1',

      setThemeMode: (mode) => set({ themeMode: mode }),
      setColorPrimary: (color) => set({ colorPrimary: color }),
      resetAppState: () => set({ themeMode: 'auto', colorPrimary: '#722ed1' }),
    }),
    { name: 'app' },
  ),
);
