import { create } from 'zustand';

interface ModalStore {
  opened: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  opened: false,
  openModal: () => set({ opened: true }),
  closeModal: () => set({ opened: false }),
}));
