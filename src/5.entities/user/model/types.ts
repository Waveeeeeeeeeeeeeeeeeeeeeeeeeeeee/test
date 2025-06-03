import { Game } from "@/5.entities/game/model/types";


export interface Purpose {
  purpose_id: number
  purpose_name: string
  purpose_description?: string
}

export interface ChosenGame {
  gameId: string;
  purpose: Purpose[];
  isOpen: boolean;
}

export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
    is_bot?: boolean;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
  }
  
  export type Gender = string;
  
  export interface UserProfile {
    age: string;
    nickname: string;
    gender: Gender | null;
    country: string;
    city: string;
    about: string;
    interests: string[];
    games: Game[];
    image: File | null;
    selectedLanguage: string;
    selectedMatchType: string;
    isFirstFormValid: boolean;
    isSecondFormValid: boolean;
  }
  
  export interface UserState {
    user: TelegramUser | null; 
    telegram: TelegramUser | null;
    profile: UserProfile;
    userHash: string | null;
  }


  export interface UserStore extends UserState {
    setTelegramUser: (user: TelegramUser) => void;
    setUserHash: (hash: string) => void;
    clearUser: () => void;
    setUserImage: (image: File) => void;
    setProfileField: <K extends keyof UserState['profile']>(key: K, value: UserState['profile'][K]) => void;
    toggleInterest: (interest: string) => void;
    addInterest: (interest: string) => void;
    removeInterest: (interest: string) => void;
    addGame: (game: Game) => void;
    removeGame: (game: Game) => void;
    toggleGame: (gameId: string) => void;
    setPurpose: (gameId: string, purpose: Purpose) => void;
    resetPurpose: (gameId: string) => void;
    toggleTargetSelector: (gameId: string) => void;
    setGamePhoto: (gameId: string, photo: File | null) => void;
    setUserAndProfileIds: (user_id: number, profile_id: number) => void;
  }




  