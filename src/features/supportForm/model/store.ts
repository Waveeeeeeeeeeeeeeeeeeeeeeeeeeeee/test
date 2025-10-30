import { create } from 'zustand';

interface SupportFormState {
  topic: string;
  description: string;
  image: File | null;
  setTopic: (topic: string) => void;
  setDescription: (desc: string) => void;
  setImage: (file: File | null) => void;
}

export const useSupportFormStore = create<SupportFormState>((set) => ({
  topic: '',
  description: '',
  image: null,
  setTopic: (topic) => set({ topic }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image })
}));