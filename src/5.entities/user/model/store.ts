import { create } from "zustand";

export interface User {
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

interface UserStore {
  user: User | null;
  userHash: string | null;
  setUser: (user: User) => void;
  setUserHash: (hash: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userHash: null,
  setUserHash(hash) { set({ userHash: hash }) },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));