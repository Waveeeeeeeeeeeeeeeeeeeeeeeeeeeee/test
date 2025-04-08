import { create } from 'zustand';

type currentPlatformState = {
  selectPlatform: string;
  setSelectedPlatform: (type: string) => void;
};

export const useCurrentPlatform = create<currentPlatformState>((set) => ({
  selectPlatform: 'webApp',
  setSelectedPlatform: (type) => set({ selectPlatform: type }),
}));