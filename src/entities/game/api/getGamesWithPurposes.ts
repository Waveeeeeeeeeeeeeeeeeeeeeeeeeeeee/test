import { GameWithPurposesAdapt } from '../types/gameWithPurposeAdapt';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const getGamesWithPurposes = async (): Promise<
	GameWithPurposesAdapt[]
> => {
	const response = await axiosInstance.get(
		'/dating/games/get_games_with_purposes'
	);
	return response.data;
};
