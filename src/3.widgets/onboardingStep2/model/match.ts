import { create } from 'zustand';

type MatchState = {
  selectedMatchType: string;
  setMatchType: (type: string) => void;
};

export const useMatchStore = create<MatchState>((set) => ({
  selectedMatchType: 'realLife',
  setMatchType: (type) => set({ selectedMatchType: type }),
}));