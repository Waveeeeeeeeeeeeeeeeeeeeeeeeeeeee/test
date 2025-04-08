import { create } from 'zustand';

type LanguageState = {
  selectedLanguage: string;
  setLanguage: (language: string) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru', 
  setLanguage: (language) => {
    set({ selectedLanguage: language });
    localStorage.setItem('selectedLanguage', language); 
  },
}));