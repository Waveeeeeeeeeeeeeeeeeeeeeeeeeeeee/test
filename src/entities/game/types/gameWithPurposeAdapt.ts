import { Game } from './game';
import { Purpose } from '@/entities/user/model/types';

export type GameWithPurposesAdapt = {
	game: Game;
	purposes: Purpose[];
};
