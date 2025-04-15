import { create } from 'zustand';
import { TelegramUser, UserStore, Purpose } from './types';
import { Game } from '@/5.entities/game/model/types';

const defaultProfile = {
  age: '',
  nickname: '',
  gender: 'men',
  city: '',
  country: '',
  about: '',
  interests: [],
  games: [],
  image: null,
  selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru',
  selectedMatchType: 'realLife',
  isFormValid: false,
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null as TelegramUser | null,
  telegram: null,
  profile: defaultProfile,
  userHash: null,
  setTelegramUser: (user: TelegramUser) => set({ telegram: user, user }),
  setUserHash: (hash) => set({ userHash: hash }),
  setUserImage: (image: File) => set({ profile: { ...get().profile, image } }),


  clearUser: () =>
    set({
      telegram: null,
      user: null,
      userHash: null,
      profile: defaultProfile,
    }),

  setProfileField: (key, value) => {
    const current = get().profile[key];
    if (current === value) return;

    const updated = { ...get().profile, [key]: value };
    const { age, nickname, gender, country, about } = updated;
    const isFormValid = !!age && !!nickname && !!gender && !!country && !!about;

    if (key === 'selectedLanguage') {
      localStorage.setItem('selectedLanguage', value as string);
    }

    set({
      profile: { ...updated, isFormValid },
    });
  },

  toggleInterest: (interest) => {
    const { interests } = get().profile;
    const exists = interests.includes(interest);
    const updated = exists
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];

    get().setProfileField('interests', updated);
  },

  addInterest: (interest) => {
    const { interests } = get().profile;
    if (!interests.includes(interest)) {
      get().setProfileField('interests', [...interests, interest]);
    }
  },

  removeInterest: (interest) => {
    const { interests } = get().profile;
    get().setProfileField(
      'interests',
      interests.filter((i) => i !== interest)
    );
  },

  addGame: (game: Game) => {
    const { games } = get().profile;
    if (!games.some((g) => g.id === game.id)) {
      get().setProfileField('games', [...games, { ...game, purpose: null, isOpen: true }]);
    }
  },

  removeGame: (game: Game) => {
    const { games } = get().profile;
    get().setProfileField(
      'games',
      games.filter((g) => g.id !== game.id)
    );
  },

  toggleGame: (gameId: string) =>
    set((state) => {
      const gameIndex = state.profile.games.findIndex(g => g.id === gameId);
      if (gameIndex === -1) return state;

      const updatedGames = [...state.profile.games];
      updatedGames[gameIndex] = {
        ...updatedGames[gameIndex],
        isOpen: !updatedGames[gameIndex].isOpen
      };

      return {
        profile: {
          ...state.profile,
          games: updatedGames
        }
      };
    }),

  setPurpose: (gameId: string, purpose: Purpose) =>
    set((state) => {
      const gameIndex = state.profile.games.findIndex(g => g.id === gameId);
      if (gameIndex === -1) return state;

      const updatedGames = [...state.profile.games];
      updatedGames[gameIndex] = {
        ...updatedGames[gameIndex],
        purpose,
        isOpen: false
      };

      return {
        profile: {
          ...state.profile,
          games: updatedGames
        }
      };
    }),

  resetPurpose: (gameId: string) =>
    set((state) => {
      const updatedGames = state.profile.games.map(game => 
        game.id === gameId ? { ...game, purpose: null } : game
      );

      return {
        profile: {
          ...state.profile,
          games: updatedGames
        }
      };
    }),
    toggleTargetSelector: (gameId: string) =>
      set((state) => {
        const gameIndex = state.profile.games.findIndex(g => g.id === gameId);
        if (gameIndex === -1) return state;
  
        const updatedGames = [...state.profile.games];
        updatedGames[gameIndex] = {
          ...updatedGames[gameIndex],
          isOpen: !updatedGames[gameIndex].isOpen,
        };
  
        return {
          profile: {
            ...state.profile,
            games: updatedGames,
          },
        };
      }),
}));
