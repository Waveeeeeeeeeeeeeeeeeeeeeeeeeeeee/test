import { create } from 'zustand';
import { TelegramUser, UserStore, Purpose } from './types';
import { Game } from '@/5.entities/game/model/types';
import { getProfileByTelegramId } from '../api/getProfileByTelegramId';

const defaultProfile = {
  age: '',
  nickname: '',
  gender: 'MALE',
  city: '',
  country: '',
  about: '',
  interests: [],
  games: [],
  image: null,
  selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru',
  selectedMatchType: 'realLife',
  user_id: null,
  profile_id: null,
  isFirstFormValid: false,
  isSecondFormValid: false
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
    const { age, nickname, gender, country, city } = updated;
    const isFirstFormValid = !!age && !!nickname && !!gender && !!country && !!city;
    const isSecondFormValid = !!updated.interests.length 
    if (key === 'selectedLanguage') {
      localStorage.setItem('selectedLanguage', value as string);
    }

    set({
      profile: { ...updated, isFirstFormValid, isSecondFormValid },
    });
  },

  setGamePhoto: (gameId, file) =>
		set(state => ({
			profile: {
				...state.profile,
				games: state.profile.games.map(game =>
					game.id === gameId ? { ...game, photo: file } : game
				),
			},
		})),

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

  setUserAndProfileIds: (user_id: number, profile_id: number) =>
  set((state) => ({
    profile: {
      ...state.profile,
      user_id,
      profile_id,
    },
  })),

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
    get().setProfileField('games', [...games, { ...game, purposes: [], isOpen: true }]);
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
    const gameIndex = state.profile.games.findIndex(g => g.id === gameId)
    if (gameIndex === -1) return state

    const game = state.profile.games[gameIndex]
    const exists = game.purposes?.some(p => p.purpose_id === purpose.purpose_id)

    const updatedPurposes = exists
      ? game.purposes.filter(p => p.purpose_id !== purpose.purpose_id)
      : [...(game.purposes || []), purpose]

    const updatedGames = [...state.profile.games]
    updatedGames[gameIndex] = {
      ...game,
      purposes: updatedPurposes
    }

    return {
      profile: {
        ...state.profile,
        games: updatedGames
      }
    }
  }),

  resetPurpose: (gameId: string) =>
  set((state) => {
    const updatedGames = state.profile.games.map(game => 
      game.id === gameId ? { ...game, purpose: [] } : game
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
      fetchUserProfile: async () => {
  const telegram = get().telegram;
  if (!telegram?.id) return;

  try {
    const profileData = await getProfileByTelegramId(telegram.id.toString());

    set((state) => ({
      profile: {
        ...state.profile,
        ...profileData,
        user_id: profileData.user_id,
        profile_id: profileData.profile_id,
        isFirstFormValid: true,
        isSecondFormValid: true,
      },
    }));
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
  }
}
}));
