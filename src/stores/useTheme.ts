import { create } from 'zustand';

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (newTheme) => set({ theme: newTheme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
