import { create } from 'zustand';

import type { User } from '@/interface';

interface SessionStore {
  user: User | null;
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
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
