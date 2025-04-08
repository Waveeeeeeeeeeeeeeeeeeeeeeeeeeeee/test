import { create } from 'zustand';

type Purpose =
  | 'Просто поиграть'
  | 'Завоеватель'
  | 'TDM'
  | 'Ultimate Royal'
  | 'Праки'
  | 'Дуо'
  | 'WoW';

interface ChosenGame {
  gameId: string;
  purpose: Purpose | null;
  isOpen: boolean;
}

interface State {
  chosenGames: Record<string, ChosenGame>;
  toggleGame: (gameId: string) => void;
  setPurpose: (gameId: string, purpose: Purpose) => void;
  resetPurpose: (gameId: string) => void;
  toggleTargetSelector: (gameId: string) => void; 
}

export const useChosenGames = create<State>((set) => ({
  chosenGames: {},
  toggleGame: (gameId) =>
    set((state) => {
      const exists = state.chosenGames[gameId];
      return {
        chosenGames: {
          ...state.chosenGames,
          [gameId]: exists
            ? { ...exists, isOpen: !exists.isOpen }
            : { gameId, purpose: null, isOpen: true },
        },
      };
    }),
  setPurpose: (gameId, purpose) =>
    set((state) => ({
      chosenGames: {
        ...state.chosenGames,
        [gameId]: {
          ...state.chosenGames[gameId],
          purpose,
          isOpen: false,
        },
      },
    })),
  resetPurpose: (gameId) =>
    set((state) => {
      const copy = { ...state.chosenGames };
      delete copy[gameId];
      return { chosenGames: copy };
    }),

    toggleTargetSelector: (gameId) =>
      set((state) => {
        const game = state.chosenGames[gameId];
        if (!game) return { chosenGames: state.chosenGames };
        return {
          chosenGames: {
            ...state.chosenGames,
            [gameId]: {
              ...game,
              isOpen: !game.isOpen,
            },
          },
        };
      }),
    
}));
