import { create } from 'zustand';

export interface ModalStore {
  opened: boolean;
  data: unknown;
  openModal: () => void;
  closeModal: () => void;
  setModalData: (data: unknown) => void;
}

export const useModal = create<ModalStore>((set) => ({
  opened: false,
  data: null,
  openModal: () => set({ opened: true }),
  closeModal: () => set({ opened: false, data: null }),
  setModalData: (data) => set({ data }),
}));
