import { GameWithPurposesAdapt } from '../types/gameWithPurposeAdapt';

import { axiosInstance } from '@/shared/api/axiosInstance';

export interface GamesResponse {
	games_with_purposes: GameWithPurposesAdapt[];
}

export const getGamesWithPurposes = async (): Promise<GamesResponse> => {
	const response = await axiosInstance.get(
		'/database/v1/dating/games/get_games_with_purposes'
	);
	return response.data;
};
