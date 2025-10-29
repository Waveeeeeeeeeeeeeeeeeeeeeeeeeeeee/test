import { axiosInstance } from '../axiosInstance';

import { MatchData } from './types/likes';

export type GetAllMatchesResponse = {
	matches: MatchData[];
};

/**
 * Получить все взаимные лайки пользователя (мэтчи)
 */
export const getAllMatches = async (): Promise<GetAllMatchesResponse> => {
	const response = await axiosInstance.get(
		'/ace-friends/dating/v1/likes/get_all_matches'
	);
	return response.data;
};
