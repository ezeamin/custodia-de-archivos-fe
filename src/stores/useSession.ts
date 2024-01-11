import { create } from 'zustand';

import { decodePayload } from '@/utilities/utils';

import type { User } from '@/interface';

interface SessionStore {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  logout: () => void;
  login: (accessToken: string) => void;
}

export const useSession = create<SessionStore>((set) => ({
  user: null,
  isLoggedIn: false, // TODO: Change this to false
  accessToken: null,
  logout: () => set({ user: null, isLoggedIn: false, accessToken: null }),
  login: (accessToken) => {
    const data = decodePayload(accessToken);

    set({ accessToken, isLoggedIn: true, user: data.user });
  },
}));
