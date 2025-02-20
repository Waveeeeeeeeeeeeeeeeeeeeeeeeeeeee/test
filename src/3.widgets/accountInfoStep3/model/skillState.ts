import { create } from "zustand";

interface FormState {
  skills: string;
  hobby: string;
  setHobby: (hobby: string) => void;
  setSkills: (skills: string) => void;
}

export const useSkillsState = create<FormState>((set) => ({
  skills: "",
  hobby: '',
  setSkills: (skill) => {
    set({ skills: skill });
  },
  setHobby: (hobby) => {
    set({ hobby: hobby });
  }
}));
