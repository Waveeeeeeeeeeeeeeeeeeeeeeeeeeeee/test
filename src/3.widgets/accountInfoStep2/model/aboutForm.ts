import { create } from "zustand";

interface FormState {
  age: string;
  nickname: string;
  gender: string | null;
  country: string;
  isFormValid: boolean;
  setAge: (age: string) => void;
  setNickname: (nickname: string) => void;
  setGender: (gender: string) => void;
  setCountry: (country: string) => void;
}

export const useFormStore = create<FormState>((set, get) => ({
  age: "",
  nickname: "",
  gender: null,
  country: "",
  isFormValid: false,
  
  setAge: (age) => set(() => {
    const { nickname, gender, country } = get();
    return { age, isFormValid: !!age && !!nickname && !!gender && !!country };
  }),
  
  setNickname: (nickname) => set(() => {
    const { age, gender, country } = get();
    return { nickname, isFormValid: !!age && !!nickname && !!gender && !!country };
  }),

  setGender: (gender) => set(() => {
    const { age, nickname, country } = get();
    return { gender, isFormValid: !!age && !!nickname && !!gender && !!country };
  }),

  setCountry: (country) => set(() => {
    const { age, nickname, gender } = get();
    return { country, isFormValid: !!age && !!nickname && !!gender && !!country };
  }),
}));
