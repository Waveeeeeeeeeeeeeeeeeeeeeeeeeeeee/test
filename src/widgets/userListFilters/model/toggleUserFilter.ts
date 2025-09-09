import { create } from 'zustand'

type State = {
	isOpen: boolean
	open: () => void
	close: () => void
	toggle: () => void
}

export const useUserFiltersToggleStore = create<State>((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	toggle: () => set(state => ({ isOpen: !state.isOpen }))
}))
