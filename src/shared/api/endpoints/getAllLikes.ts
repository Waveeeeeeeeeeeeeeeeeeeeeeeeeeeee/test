import { axiosInstance } from '../axiosInstance';

import { LikeData } from './types/likes';

export type GetAllLikesResponse = {
	likes: LikeData[];
};

/**
 * Получить все лайки пользователя
 */
export const getAllLikes = async (): Promise<GetAllLikesResponse> => {
	const response = await axiosInstance.get(
		'/ace-friends/dating/v1/likes/get_all_likes'
	);
	return response.data;
};
