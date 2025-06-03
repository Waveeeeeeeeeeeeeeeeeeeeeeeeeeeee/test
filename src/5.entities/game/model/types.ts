import { Purpose } from "@/5.entities/user/model/types";

export type Game = {
    id: string;
    title: string;
    icon: string;   
    players: number;
    purpose?: Purpose[];
    isOpen?: boolean;
    photo?: File | null
  };