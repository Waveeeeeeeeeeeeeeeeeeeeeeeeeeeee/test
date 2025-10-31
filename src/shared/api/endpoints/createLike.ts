import { axiosInstance } from '../axiosInstance';

export type CreateLikeParams = {
	receiver_id: number;
	creator_message?: string;
};

export type CreateLikeResponse = {
	success: boolean;
};

export const createLike = async (
	data: CreateLikeParams
): Promise<CreateLikeResponse> => {
	const response = await axiosInstance.post(
		'/ace-friends/dating/v1/likes/create_like',
		data
	);
	return response.data;
};
