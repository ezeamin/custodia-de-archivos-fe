import { create } from 'zustand';

import { userRoles } from '@/constants/userRoles/userRoles';
import { decodePayload } from '@/utilities/utils';

import type { User } from '@/interface';

interface SessionStore {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  logout: () => void;
  login: (accessToken: string) => void;
}

console.log('userRoles', userRoles);

const testUser = {
  id: '1',
  name: 'Test User',
  role: userRoles.ADMIN,
};

// ! Remember to change isLoggedIn when testing

// const testUser = {
//   id: null,
//   name: null,
//   role: null,
// };

export const useSession = create<SessionStore>((set) => ({
  user: testUser,
  isLoggedIn: true, // TODO: Change this to false
  accessToken: null,
  logout: () => set({ user: null, isLoggedIn: false }),
  login: (accessToken) => {
    const data = decodePayload(accessToken);

    set({ accessToken, isLoggedIn: true, user: data.user });
  },
}));
