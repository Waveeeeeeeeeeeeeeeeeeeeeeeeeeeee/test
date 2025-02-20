import { create } from 'zustand'

interface UseSelectionStore {
  selected: string[]
  toggleSelection: (item: string) => void
}

export const useSelectionStore = create<UseSelectionStore>((set) => ({
  selected: [],
  toggleSelection: (item) =>
    set((state) => ({
      selected: state.selected.includes(item)
        ? state.selected.filter((i) => i !== item)
        : [...state.selected, item],
    })),
}))