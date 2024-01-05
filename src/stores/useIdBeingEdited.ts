import { create } from 'zustand';

interface IdBeingEditedStore {
  idBeingEdited: string | null;
  data: Record<string, unknown> | null;
  setIdBeingEdited: (id: string) => void;
  setData: (data: Record<string, unknown>) => void;
  clear: () => void;
}

export const useIdBeingEdited = create<IdBeingEditedStore>((set) => ({
  idBeingEdited: null,
  data: null,
  setIdBeingEdited: (id: string) => set({ idBeingEdited: id }),
  setData: (data) => set({ data }),
  clear: () => set({ idBeingEdited: null, data: null }),
}));
