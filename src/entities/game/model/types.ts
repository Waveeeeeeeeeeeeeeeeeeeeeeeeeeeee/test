import { Purpose } from '@/entities/user/model/types';

export type Game = {
	id: string;
	title: string;
	icon: string;
	players: number;
	purposes: Purpose[];
	isOpen?: boolean;
	photo?: File | null;
};
