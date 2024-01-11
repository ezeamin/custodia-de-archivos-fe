import { create } from 'zustand';

export interface ModalStore {
  opened: boolean;
  data: unknown;
  modalId: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
  setModalData: (data: unknown) => void;
}

export const useModal = create<ModalStore>((set) => ({
  opened: false,
  data: null,
  modalId: null,
  openModal: (id) => set({ opened: true, modalId: id }),
  closeModal: () => set({ opened: false, data: null }),
  setModalData: (data) => set({ data }),
}));
