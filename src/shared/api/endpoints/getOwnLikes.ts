import { axiosInstance } from '../axiosInstance';

import { LikeData } from './types/likes';

export type GetOwnLikesResponse = {
	likes: LikeData[];
};

/**
 * Получить лайки, которые пользователь поставил другим
 */
export const getOwnLikes = async (): Promise<GetOwnLikesResponse> => {
	const response = await axiosInstance.get(
		'/ace-friends/dating/v1/likes/get_own_likes'
	);
	return response.data;
};
