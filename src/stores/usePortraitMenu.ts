import { create } from 'zustand';

interface PortraitMenuStore {
  opened: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const usePortraitMenu = create<PortraitMenuStore>((set) => ({
  opened: false,
  openMenu: () => set({ opened: true }),
  closeMenu: () => set({ opened: false }),
}));
