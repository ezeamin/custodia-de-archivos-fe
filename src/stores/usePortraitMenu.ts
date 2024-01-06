import { create } from 'zustand';

interface PortraitMenuStore {
  opened: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const usePortraitMenu = create<PortraitMenuStore>((set) => ({
  opened: false,
  openMenu: () => {
    const content = document.getElementById('content');
    if (content) content.style.overflow = 'hidden';
    set({ opened: true });
  },
  closeMenu: () => {
    const content = document.getElementById('content');
    if (content) content.style.overflow = 'auto';
    set({ opened: false });
  },
}));
