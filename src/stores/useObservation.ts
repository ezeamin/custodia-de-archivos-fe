import { create } from 'zustand';

export interface ObservationStore {
  message: string;
  id: string;
  setObservationData: ({
    message,
    id,
  }: {
    message: string;
    id: string;
  }) => void;
  clearObservationData: () => void;
}

export const useObservation = create<ObservationStore>((set) => ({
  message: '',
  id: '',
  setObservationData: ({ message, id }) => set({ message, id }),
  clearObservationData: () => set({ message: '', id: '' }),
}));
