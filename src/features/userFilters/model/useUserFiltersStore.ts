import { create } from 'zustand'


interface UserFiltersState {
	gender: string
	scope: string
	selectedGames: string[]
	setGender: (g: string) => void
	setScope: (s: string) => void
	toggleSelectedGames: (gameId: string) => void 
	reset: () => void
}

export const useUserFiltersStore = create<UserFiltersState>((set) => ({
	gender: 'MALE',
	scope: 'city',
	selectedGames: [],
	setGender: (gender) => set({ gender }),
	setScope: (scope) => set({ scope }),
	toggleSelectedGames: (gameId) => {
 
  	set((state) => {
    const isSelected = state.selectedGames.includes(gameId);
    const newSelectedGames = isSelected
      ? state.selectedGames.filter(id => id !== gameId) 
      : [...state.selectedGames, gameId];
  
    	return { selectedGames: newSelectedGames };
 	 });
},
	reset: () => set({
		gender: 'MALE',
		scope: 'city',
		selectedGames: [],
	})
}))
