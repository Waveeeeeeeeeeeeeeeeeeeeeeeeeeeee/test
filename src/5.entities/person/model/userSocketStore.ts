import { UserProfile } from '@/5.entities/user/model/types'
import { create } from 'zustand'

interface UserSocketState {
	users: UserProfile[]
	setUsers: (users: UserProfile[]) => void
}

export const useUserSocketStore = create<UserSocketState>(set => ({
	users: [],
	setUsers: users => set({ users })
}))
