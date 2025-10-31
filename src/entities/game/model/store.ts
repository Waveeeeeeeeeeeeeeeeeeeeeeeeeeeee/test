import { create } from 'zustand';
import { Game } from './types';

type Purpose = {
  purpose_id: number;
  purpose_name: string;
  purpose_description: string;
};


export type GameWithPurposes = {
  game: Game;
  purposes: Purpose[];
};

interface GameStore {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  setGames: (games: Game[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  isLoading: false,
  error: null,
  setGames: (games) => set({ games }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));