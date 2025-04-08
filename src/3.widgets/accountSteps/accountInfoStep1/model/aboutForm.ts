import { create } from "zustand";

interface FormState {
  age: string;
  nickname: string;
  gender: string | null;
  country: string;
  isFormValid: boolean;
  image: File | null;
  about: string;
  interests: string[];
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  toggleInterest: (interest: string) => void;
  setAge: (age: string) => void;
  setNickname: (nickname: string) => void;
  setGender: (gender: string) => void;
  setCountry: (country: string) => void;
  setImage: (image: File) => void
  setAbout: (info: string) => void
}

export const useFormStore = create<FormState>((set, get) => ({
  age: "",
  nickname: "",
  gender: 'men',
  country: "",
  isFormValid: false,
  image: null,
  about: '',
  interests: [],

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
  setImage: (image) =>
    set(() => ({
      image,
    })),
  setAbout: (about) => set(() => {
      const { age, nickname, gender } = get();
      return { about, isFormValid: !!age && !!nickname && !!gender && !!about };
  }),
  addInterest: (interest) =>
    set((state) => {
      if (state.interests.includes(interest)) return state;
      return { interests: [...state.interests, interest] };
    }),

  removeInterest: (interest) =>
    set((state) => ({
      interests: state.interests.filter((i) => i !== interest),
    })),

  toggleInterest: (interest) =>
    set((state) => {
      const isSelected = state.interests.includes(interest);
      const newInterests = isSelected
        ? state.interests.filter((i) => i !== interest)
        : [...state.interests, interest];
      return { interests: newInterests };
    }),

}));
