import { create } from 'zustand';

import type { User } from '@/interface';

interface SessionStore {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const testUser = {
  id: '1',
  name: 'Test User',
  email: '',
};

export const useSession = create<SessionStore>((set) => ({
  user: testUser,
  isLoggedIn: true, // TODO: Change this to false
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
