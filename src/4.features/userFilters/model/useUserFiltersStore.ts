import { create } from 'zustand'


interface UserFiltersState {
	gender: string
	scope: string
	selectedGames: string[]
	setGender: (g: string) => void
	setScope: (s: string) => void
	setSelectedGames: (gameId: string) => void 
	reset: () => void
}

export const useUserFiltersStore = create<UserFiltersState>((set) => ({
	gender: 'men',
	scope: 'city',
	selectedGames: [],
	setGender: (gender) => set({ gender }),
	setScope: (scope) => set({ scope }),
	setSelectedGames: (gameId) => set((state) => {
		const isSelected = state.selectedGames.includes(gameId);
		const newSelectedGames = isSelected
			? state.selectedGames.filter(id => id !== gameId) 
			: [...state.selectedGames, gameId]; 

		return { selectedGames: newSelectedGames };
	}),
	reset: () => set({
		gender: 'men',
		scope: 'city',
		selectedGames: [],
	})
}))
