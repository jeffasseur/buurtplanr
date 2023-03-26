import { create } from "zustand";

interface DroppedModel {
  model: string | null;
  updateModel: (model: string | null) => void;
}

export const useDroppedModel = create<DroppedModel>((set) => ({
  model: null,
  updateModel: (el) => set(() => ({ model: el }))
}))