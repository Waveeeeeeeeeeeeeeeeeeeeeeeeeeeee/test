import { create } from 'zustand';

import { UserProfile } from '@/entities/user/model/types';

interface UserSocketState {
  users: UserProfile[];
  setUsers: (users: UserProfile[]) => void;
}

export const useUserSocketStore = create<UserSocketState>((set) => ({
  users: [],
  setUsers: (users) => set({ users })
}));