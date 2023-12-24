import { create } from 'zustand';

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const savedTheme = localStorage.getItem('theme');
const preferredTheme =
  savedTheme ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');
document.documentElement.setAttribute('data-theme', preferredTheme);

const updateTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const useTheme = create<ThemeStore>((set, get) => ({
  theme: preferredTheme,
  setTheme: (newTheme) => {
    updateTheme(newTheme);
    set({ theme: newTheme });
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
    set({ theme: newTheme });
  },
}));
